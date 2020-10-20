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
            List<Animal> list = new List<Animal>();

            using (MySqlConnection conn = GetConnection())
            {


                MySqlCommand cmd = new MySqlCommand("select * from puppytable", conn);
                conn.Open();
                using (var reader = cmd.ExecuteReader())
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
            Animal getAnimalItem = new Animal();

            using (MySqlConnection conn = GetConnection())
            {


                MySqlCommand cmd = new MySqlCommand("select * from puppytable where idpuppytable = '" + id + "'", conn);
                conn.Open();
                try
                {
                    using (var reader = cmd.ExecuteReader())
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
                    Console.WriteLine("hata: " + e);
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


                MySqlCommand cmd = new MySqlCommand(updateAnimalCmdString, conn);
                try
                {

                    cmd.Parameters.AddWithValue("@animalid", updatedAnimalData.ID);
                    cmd.Parameters.AddWithValue("@agepuppy", updatedAnimalData.Age);
                    cmd.Parameters.AddWithValue("@lastvaccine", sqlFormattedDateLast);
                    cmd.Parameters.AddWithValue("@nextvaccine", sqlFormattedDateNext);

                    using (var reader = cmd.ExecuteReader())
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

                /* try
                 {
                     cmd.Parameters.AddWithValue("@animalid", updatedAnimalData.ID);
                     cmd.Parameters.AddWithValue("@agepuppy", updatedAnimalData.Age);
                     cmd.Parameters.AddWithValue("@lastvaccine", updatedAnimalData.LastVaccineDate);
                     cmd.Parameters.AddWithValue("@nextvaccine", updatedAnimalData.NextVaccineDate);

                 }
                 catch (Exception exc)
                 {
                     Console.WriteLine(exc.Message);
                 }
                 finally
                 {
                     conn.Close();
                 }*/
            }
            return updatedAnimalData;

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
                /*string sqlFormattedDateNext = nextTemp.ToString("yyyy-MM-dd HH:mm:ss.fff");
                string sqlFormattedDateLast = lastTemp.ToString("yyyy-MM-dd HH:mm:ss.fff");*/
                Console.WriteLine("animalobject:" + animalToAdd.ToString());

                string insertAnimalCmdString = "insert into puppytable (idpuppytable,agepuppytable,latestvaccinetable,nextvaccinetable) values ('" + animalToAdd.ID + "','" + animalToAdd.Age + "','" + sqlFormattedDateLast + "','" + sqlFormattedDateNext + "')";
                MySqlCommand cmd = new MySqlCommand(insertAnimalCmdString, conn);
                try
                {
                    using (var reader = cmd.ExecuteReader())
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
                /*string insertAnimalCmdString = "insert into puppytable (idpuppytable,agepuppytable,latestvaccinetable,nextvaccinetable) values (@idpuppytable,@agepuppytable,@lastvaccinetable,@nextvaccinetable)";
                MySqlCommand cmd = new MySqlCommand(insertAnimalCmdString, conn);
                try
                {
                    cmd.Parameters.AddWithValue("@idpuppytable", animalToAdd.ID);
                    cmd.Parameters.AddWithValue("@agepuppytable", animalToAdd.Age);
                    cmd.Parameters.AddWithValue("@latestvaccinetable", animalToAdd.LastVaccineDate);
                    cmd.Parameters.AddWithValue("@nextvaccinetable", animalToAdd.NextVaccineDate);

                    return animalToAdd;
                }
                catch (Exception exc)
                {
                    Console.WriteLine(exc.Message);
                    return animalToAdd;
                }
                finally
                {
                    conn.Close();
                }*/
            }

        }














    }
}