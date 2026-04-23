create database ToDoApplicationDb

create table ToDoItems(
Id int identity(1,1) primary key, 
[Description] nvarchar(max) not null,
IsDone bit not null default 0,
CreatedAt datetime null default getdate(),
UpdatedAt datetime null)

insert into ToDoItems (Description)
values ('Wake up'), ('Eat')

select * from ToDoItems