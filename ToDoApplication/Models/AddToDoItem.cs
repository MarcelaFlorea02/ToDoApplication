namespace ToDoApplication.Models;

public class AddToDoItem
{
    public required string Description { get; set; }
    public bool IsDone { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
