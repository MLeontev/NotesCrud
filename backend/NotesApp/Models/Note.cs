namespace NotesApp.Models;

public class Note
{
    public long Id { get; init; }

    public string Title { get; set; } = String.Empty;

    public string Description { get; set; } = String.Empty;

    public DateTime CreatedAt { get; init; }
}