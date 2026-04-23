namespace ToDoApplication.Models;

public class UpdateToDoItem
{
    public required string Description { get; set; }
    public bool IsDone { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
