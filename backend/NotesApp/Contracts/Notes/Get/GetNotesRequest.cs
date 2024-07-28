namespace NotesApp.Contracts.Notes.Get;

public record GetNotesRequest(
    string? Search,
    string? SortItem,
    string? SortOrder,
    int Limit = 10,
    int Page = 1);