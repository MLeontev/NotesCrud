namespace NotesApp.Contracts.Notes.Get;

public record GetNotesResponse(
    List<NoteDto> Notes,
    int TotalCount,
    int TotalPages,
    int Page,
    int Limit);