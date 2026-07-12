using Microsoft.EntityFrameworkCore;
using PetShopManagerAPI.Models;

namespace PetShopManagerAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Animal> Animais { get; set; }

    public DbSet<Usuario> Usuarios { get; set; }
}