using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Animal
            {
                NextVaccineDate = DateTime.Now.AddDays(index),
                LastVaccineDate = DateTime.Now.AddDays(index),
                Age = rng.Next(-20, 55),
                ID = rng.Next(-20, 55)
            })
            .ToArray();
        }
    }
}
