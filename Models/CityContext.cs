using Microsoft.EntityFrameworkCore;

namespace CityApi.Models
{
    public class CityContext : DbContext
    {
        public CityContext(DbContextOptions<CityContext> options)
            : base(options)
        {
        }

        public DbSet<City> City { get; set; }
    }
}