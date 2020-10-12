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
        public Animal Get(int id)
        {
            DataTool context = HttpContext.RequestServices.GetService(typeof(DataTool)) as DataTool;
            return context.GetPuppy(id);
        }

    }
}
