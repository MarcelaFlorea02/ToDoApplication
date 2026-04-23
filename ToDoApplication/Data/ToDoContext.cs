using Microsoft.EntityFrameworkCore;
using ToDoApplication.Models;

namespace ToDoApplication.Data;

public class ToDoContext : DbContext
{
    //used to inject options like connection string 
    public ToDoContext(DbContextOptions<ToDoContext> options) : base(options) { }

    //define tables 
    public DbSet<ToDoItem> ToDoItems { get; set; }

    //define actions 
    //GET all 
    public Task<List<ToDoItem>> GetAllAsync()
    {
        var items = ToDoItems.ToListAsync();
        return items;
    }

    //GET by id 
    public Task<ToDoItem?> GetByIdAsync(int id)
    {
        var item = ToDoItems.Where(item => item.Id == id).FirstOrDefaultAsync();
        return item;
    }

    //Add 
    public async Task AddAsync(ToDoItem item)
    {
        await ToDoItems.AddAsync(item);
        await base.SaveChangesAsync();
    }

    //Update 
    public async Task UpdateAsync(ToDoItem item)
    {
        ToDoItems.Update(item);
        await base.SaveChangesAsync();
    }

    //Delete 
    public async Task<bool> DeleteAsync(int id)
    {
        var item = await ToDoItems.Where(item => item.Id == id).FirstOrDefaultAsync();
        if (item == null)
            return false;

        ToDoItems.Remove(item);
        await base.SaveChangesAsync();
        return true;
    }
}
