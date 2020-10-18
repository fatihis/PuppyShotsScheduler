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

        public void updateAnimal(int id, Animal updatedAnimalData)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string updateAnimalCmdString = "update puppytable set iduppytable=@animalid, agepuppytable=@agepuppy, lastvaccinetable=@lastvaccine, nextvaccinetable=@nextvaccine where OgrenciId='" + id + "'";
                MySqlCommand cmd = new MySqlCommand(updateAnimalCmdString, conn);
                try
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
                }
            }

        }

        public void AddPuppy(Animal animalToAdd)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string insertAnimalCmdString = "insert into puppytable (idpuppytable,agepuppytable,lastvaccinetable,nextvaccinetable) values (@id,@age,@lastvaccinedate,@nextvaccinedate)";
                MySqlCommand cmd = new MySqlCommand(insertAnimalCmdString, conn);
                try
                {
                    cmd.Parameters.AddWithValue("@animalid", animalToAdd.ID);
                    cmd.Parameters.AddWithValue("@agepuppy", animalToAdd.Age);
                    cmd.Parameters.AddWithValue("@lastvaccine", animalToAdd.LastVaccineDate);
                    cmd.Parameters.AddWithValue("@nextvaccine", animalToAdd.NextVaccineDate);

                }
                catch (Exception exc)
                {
                    Console.WriteLine(exc.Message);
                }
                finally
                {
                    conn.Close();
                }
            }

        }














    }
}