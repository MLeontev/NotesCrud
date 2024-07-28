using System.ComponentModel.DataAnnotations;

namespace NotesApp.Contracts.Notes.Post;

public record CreateNoteRequest(
    [Required(ErrorMessage = "Title is required")]
    [StringLength(100, ErrorMessage = "Title length can't be more than 100 characters")]
    string Title,
    
    [Required(ErrorMessage = "Description is required")]
    [StringLength(500, ErrorMessage = "Description length can't be more than 500 characters")]
    string Description);