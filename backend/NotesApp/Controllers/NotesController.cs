using System.Data;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApp.Contracts.Notes;
using NotesApp.Contracts.Notes.Get;
using NotesApp.Contracts.Notes.Post;
using NotesApp.Contracts.Notes.Put;
using NotesApp.DataAccess;
using NotesApp.Models;

namespace NotesApp.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
    {
        var notesQuery = _dbContext.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                        n.Title.ToLower().Contains(request.Search.ToLower()));

        Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
        {
            "title" => (note => note.Title),
            "date" => (note => note.CreatedAt),
            _ => (note => note.CreatedAt)
        };

        notesQuery = request.SortOrder == "desc"
            ? notesQuery.OrderByDescending(selectorKey)
            : notesQuery.OrderBy(selectorKey);

        var totalCount = await notesQuery.CountAsync(ct);

        var limit = request.Limit > 0 ? request.Limit : 10;
        var page = request.Page > 0 ? request.Page : 1;

        notesQuery = notesQuery
            .Skip((page - 1) * limit)
            .Take(limit);

        var noteDtos = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(ct);

        var totalPages = (int)Math.Ceiling((double)totalCount / limit);

        return Ok(new GetNotesResponse(noteDtos, totalCount, totalPages, page, limit));
    }

    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetNote(long id, CancellationToken ct)
    {
        var note = await _dbContext.Notes.FindAsync([id, ct], cancellationToken: ct);

        if (note == null)
        {
            return NotFound();
        }

        var noteDto = new NoteDto(note.Id, note.Title, note.Description, note.CreatedAt);
        return Ok(noteDto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var note = new Note
        {
            Title = request.Title,
            Description = request.Description,
            CreatedAt = DateTime.UtcNow
        };

        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);

        var noteDto = new NoteDto(note.Id, note.Title, note.Description, note.CreatedAt);

        return CreatedAtAction(nameof(GetNote), new { id = note.Id }, noteDto);
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id, CancellationToken ct)
    {
        var note = await _dbContext.Notes.FindAsync([id], cancellationToken: ct);

        if (note == null)
        {
            return NotFound();
        }

        _dbContext.Remove(note);
        await _dbContext.SaveChangesAsync(ct);

        return NoContent();
    }

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateNoteRequest request, CancellationToken ct)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        var note = await _dbContext.Notes.FindAsync([id], cancellationToken: ct);

        if (note == null)
        {
            return NotFound();
        }

        note.Title = request.Title;
        note.Description = request.Description;

        _dbContext.Entry(note).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync(ct);
        }
        catch (DBConcurrencyException) when (!_dbContext.Notes.Any(n => n.Id == id))
        {
            return NotFound();
        }

        return NoContent();
    }
}