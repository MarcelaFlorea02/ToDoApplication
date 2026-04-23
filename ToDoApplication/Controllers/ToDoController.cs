using Microsoft.AspNetCore.Mvc;
using ToDoApplication.Data;
using ToDoApplication.Models;

namespace ToDoApplication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToDoController : ControllerBase
{
    private readonly ToDoContext _context;

    //dependency injection 
    public ToDoController(ToDoContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ToDoItem>>> GetAll()
    {
        var todoItems = await _context.GetAllAsync();
        return Ok(todoItems);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ToDoItem>> GetById(int id)
    {
        var item = await _context.GetByIdAsync(id);
        if (item == null)
            return NotFound("Item not found");

        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult> Add(AddToDoItem item)
    {
        var itemToBeAdded = new ToDoItem()
        {
            Description = item.Description,
            IsDone = item.IsDone,
            CreatedAt = item.CreatedAt
        };

        await _context.AddAsync(itemToBeAdded);
        return Ok();
    }

}
