using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetShopManagerAPI.Data;
using PetShopManagerAPI.Models;

namespace PetShopManagerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AnimaisController : ControllerBase
{
    private readonly AppDbContext _context;

    public AnimaisController(AppDbContext context)
    {
        _context = context;
    }

    // Listar todos os animais
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Animal>>> GetAnimais()
    {
        return await _context.Animais.ToListAsync();
    }

    // Buscar animal por ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Animal>> GetAnimal(int id)
    {
        var animal = await _context.Animais.FindAsync(id);

        if (animal == null)
            return NotFound("Animal não encontrado.");

        return animal;
    }

    // Cadastrar novo animal
    [HttpPost]
    public async Task<ActionResult> PostAnimal(Animal animal)
    {
        _context.Animais.Add(animal);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAnimal),
            new { id = animal.Id }, animal);
    }

    // Atualizar animal
    [HttpPut("{id}")]
    public async Task<ActionResult> PutAnimal(int id, Animal animal)
    {
        if (id != animal.Id)
            return BadRequest();

        _context.Entry(animal).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Excluir animal
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAnimal(int id)
    {
        var animal = await _context.Animais.FindAsync(id);

        if (animal == null)
            return NotFound();

        _context.Animais.Remove(animal);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}