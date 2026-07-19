using System.ComponentModel.DataAnnotations;

namespace PetShopManagerAPI.Models;

public class Animal
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; }

    public int Idade { get; set; }

    public double Peso { get; set; }

    public DateTime DataNascimento { get; set; }

    public string? Foto { get; set; }

    public string Especie { get; set; }

    public string NomeTutor { get; set; }

    public string Cep { get; set; }

    public string Logradouro { get; set; }

    public string Numero { get; set; }

    public string Bairro { get; set; }

    public string Cidade { get; set; }

    public string UF { get; set; }
}