using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        public IEnumerable<Animal> Get() //https://localhost:5001/animal (mapping route)
        {
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            return context.GetAllPuppys();
        }

        [HttpGet("{id}")]
        public Animal Get(int id) //https://localhost:5001/animal/{id} (mapping route)
        {
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            return context.GetPuppy(id);
        }
        [HttpDelete("{id}")] //https://localhost:5001/animal/{id} (mapping route)
        public int Delete(int id)
        {
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;

            return context.deleteAnimal(id);
        }
        [HttpPost("add")] //https://localhost:5001/animal/add (mapping route)
        public Animal add([FromBody] Animal animalToAdd)
        {


            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            context.AddPuppy(animalToAdd);
            return animalToAdd;

        }
        [HttpPut("update")] //https://localhost:5001/animal/update (mapping route)
        public Animal Put(Animal animalToUpdate)
        {
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;

            return context.updateAnimal(animalToUpdate);
        }





    }
}
