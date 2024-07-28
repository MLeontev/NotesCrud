namespace NotesApp.Contracts.Notes;

public record NoteDto(
    long Id,
    string Title,
    string Description,
    DateTime CreatedAt);