using System;

namespace VaccineTracker
{

    public class Animal
    {

        public int ID { get; set; }
        public DateTime LastVaccineDate { get; set; }

        public DateTime NextVaccineDate { get; set; }

        public int Age { get; set; }

    }
}
