using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Cart
    {
        public int CartID { get; set; }

        public string ProductName { get; set; }

        public int ProductNumber { get; set; }

        public int ProductPrice { get; set; }

        public int ProductQuantity { get; set; }
    }
}
