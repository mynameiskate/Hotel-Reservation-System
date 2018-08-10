﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Exceptions
{
    public class BookingException : Exception
    {
        public BookingException()
        { }

        public BookingException(string message)
            : base(message)
        { }

        public BookingException(string message, Exception inner)
            : base(message, inner)
        { }
    }
}
