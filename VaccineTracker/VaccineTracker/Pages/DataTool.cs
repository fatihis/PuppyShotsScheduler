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
                            NextVaccineDate = Convert.ToDateTime(reader["latestvaccinetable"].ToString())


                        });
                    }
                }
            }
            return list;
        }
















    }
}