using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using MySql.Data.MySqlClient;


namespace VaccineTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnimalController : ControllerBase
    {






        private readonly ILogger<AnimalController> _logger;

        public AnimalController(ILogger<AnimalController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Animal> Get()
        {
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            return context.GetAllPuppys();
        }

        [HttpGet("{id}")]
        public Animal Get(int id)
        {
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            return context.GetPuppy(id);
        }
        [HttpPost]
        public Animal add(Animal animalToAdd)
        {

            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            context.AddPuppy(animalToAdd);
            return context.GetPuppy(animalToAdd.ID);

        }

        public Animal Set(int id, int age, DateTime last, DateTime next)
        {
            Animal animalToAdd = new Animal
            {
                Age = age,
                ID = id,
                LastVaccineDate = last,
                NextVaccineDate = next
            };
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            context.AddPuppy(animalToAdd);
            return context.GetPuppy(id);

        }
        public Animal Set(int id, Animal data)
        {
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            context.updateAnimal(id, data);
            return context.GetPuppy(id);
        }

    }
}
