using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using VaccineTracker;

namespace VaccineTracker
{
    public class DataTool
    {
        public string ConnectionString { get; set; }

        public DataTool(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }




        public List<Animal> GetAllPuppys()
        {
            List<Animal> list = new List<Animal>();//creating list to fill with retrieved data

            using (MySqlConnection conn = GetConnection())
            {


                MySqlCommand cmd = new MySqlCommand("select * from puppytable", conn); //construct query
                conn.Open();
                using (var reader = cmd.ExecuteReader())//execute query
                {
                    while (reader.Read())
                    {

                        list.Add(new Animal()
                        {

                            ID = Convert.ToInt32(reader["idpuppytable"]),
                            Age = Convert.ToInt32(reader["agepuppytable"]),
                            LastVaccineDate = DateTime.Parse(reader["latestvaccinetable"].ToString()),
                            NextVaccineDate = Convert.ToDateTime(reader["nextvaccinetable"].ToString())


                        });
                    }
                }

            }

            return list;
        }
        public Animal GetPuppy(int id)
        {
            Animal getAnimalItem = new Animal();//creating Animal object to equal retrieved data

            using (MySqlConnection conn = GetConnection())
            {


                MySqlCommand cmd = new MySqlCommand("select * from puppytable where idpuppytable = '" + id + "'", conn);//construct query
                conn.Open();
                try
                {
                    using (var reader = cmd.ExecuteReader())//execute query
                    {
                        while (reader.Read())
                        {
                            getAnimalItem = new Animal()
                            {

                                ID = Convert.ToInt32(reader["idpuppytable"]),
                                Age = Convert.ToInt32(reader["agepuppytable"]),
                                LastVaccineDate = DateTime.Parse(reader["latestvaccinetable"].ToString()),
                                NextVaccineDate = Convert.ToDateTime(reader["nextvaccinetable"].ToString())


                            };
                        }
                    }
                }
                catch (ArgumentException e)
                {
                    Console.WriteLine("error: " + e);
                }
            }
            return getAnimalItem;
        }

        public Animal updateAnimal(Animal updatedAnimalData)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string sqlFormattedDateLast = updatedAnimalData.LastVaccineDate.ToString("yyyy-MM-dd HH:mm:ss.fff");
                string sqlFormattedDateNext = updatedAnimalData.NextVaccineDate.ToString("yyyy-MM-dd HH:mm:ss.fff");
                string updateAnimalCmdString = "update puppytable set agepuppytable=@agepuppy, latestvaccinetable=@lastvaccine, nextvaccinetable=@nextvaccine where idpuppytable= '" + updatedAnimalData.ID + "'";


                MySqlCommand cmd = new MySqlCommand(updateAnimalCmdString, conn);//construct query
                try
                {

                    //fill predefined parameters
                    cmd.Parameters.AddWithValue("@animalid", updatedAnimalData.ID);
                    cmd.Parameters.AddWithValue("@agepuppy", updatedAnimalData.Age);
                    cmd.Parameters.AddWithValue("@lastvaccine", sqlFormattedDateLast);
                    cmd.Parameters.AddWithValue("@nextvaccine", sqlFormattedDateNext);

                    using (var reader = cmd.ExecuteReader())//execute query
                    {
                        while (reader.Read())
                        {
                        }
                    }

                }
                catch (ArgumentException e)
                {
                    Console.WriteLine("hata: " + e);
                }


            }
            return updatedAnimalData;

        }
        public int deleteAnimal(int id)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();

                string updateAnimalCmdString = "DELETE FROM puppytable WHERE idpuppytable=" + id;
                MySqlCommand cmd = new MySqlCommand(updateAnimalCmdString, conn);//construct query
                try
                {

                    using (var reader = cmd.ExecuteReader())//execute query
                    {
                        while (reader.Read())
                        {
                        }
                    }

                }
                catch (ArgumentException e)
                {
                    Console.WriteLine("hata: " + e);
                }


            }
            return id;

        }

        public Animal AddPuppy(Animal animalToAdd)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                DateTime nextTemp = DateTime.Now;
                DateTime lastTemp = DateTime.Now.AddDays(90);
                string sqlFormattedDateLast = animalToAdd.LastVaccineDate.ToString("yyyy-MM-dd HH:mm:ss.fff");
                string sqlFormattedDateNext = animalToAdd.NextVaccineDate.ToString("yyyy-MM-dd HH:mm:ss.fff");
                string insertAnimalCmdString = "insert into puppytable (idpuppytable,agepuppytable,latestvaccinetable,nextvaccinetable) values ('" + animalToAdd.ID + "','" + animalToAdd.Age + "','" + sqlFormattedDateLast + "','" + sqlFormattedDateNext + "')";
                MySqlCommand cmd = new MySqlCommand(insertAnimalCmdString, conn);//construct query
                try
                {
                    using (var reader = cmd.ExecuteReader())//execute query
                    {
                        while (reader.Read())
                        {

                        }
                    }
                    return animalToAdd;
                }
                catch (ArgumentException e)
                {
                    Console.WriteLine("hata: " + e);
                    return animalToAdd;
                }

            }

        }














    }
}