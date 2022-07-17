using System;

namespace TiktokWidget.Common.HttpLogging
{
    public class UrlLog
    {
        public UrlLog(int port, string path, string host, string scheme)
        {
            Port = port;
            Path = path;
            Host = host;
            Scheme = scheme;
        }

        public static UrlLog Default =>
            new UrlLog(80, "/", "localhost", "http");


        public int Port { get; }

        public string Path { get; }

        public string Host { get; }

        public string Scheme { get; }

        public string Absolute => ToString();

        public override string ToString()
        {
            return new UriBuilder(Scheme, Host, Port, Path).Uri.ToString();
        }
    }
}