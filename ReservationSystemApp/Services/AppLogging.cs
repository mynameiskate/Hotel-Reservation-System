using Microsoft.Extensions.Logging;

namespace ReservationSystemApp.Services
{
    public class AppLogging
    {
        private static ILoggerFactory _loggerFactory = null;
        private static string _filePath;

        public static void SetPath(string path)
        {
            _filePath = path;
        }

        public static void ConfigureLogger(ILoggerFactory loggerFactory)
        {
            var filterLoggerSettings = new FilterLoggerSettings
            {
                {"Microsoft", LogLevel.Error },
                {"System", LogLevel.Error },
            };

            loggerFactory = loggerFactory.WithFilter(filterLoggerSettings);
            loggerFactory.AddFile(_filePath); 
        }

        public static ILoggerFactory LoggerFactory
        {
            get
            {
                if (_loggerFactory == null)
                {
                    _loggerFactory = new LoggerFactory();
                    ConfigureLogger(_loggerFactory);
                }
                return _loggerFactory;
            }
            set { _loggerFactory = value; }
        }

        public static ILogger CreateLogger(string category) => LoggerFactory.CreateLogger(category);
    }
}
