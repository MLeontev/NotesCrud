using Microsoft.EntityFrameworkCore;
using NotesApp.Models;

namespace NotesApp.DataAccess;

public class NotesDbContext : DbContext
{
    public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options)
    {
    }

    public DbSet<Note> Notes => Set<Note>();
}