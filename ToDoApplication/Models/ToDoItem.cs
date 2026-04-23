namespace ToDoApplication.Models;

public class ToDoItem
{
    public int Id { get; set; }
    public required string  Description { get; set; }
    public bool IsDone { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
    public DateTime? UpdatedAt { get; set; }
}
