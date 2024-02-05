//using System;
//using System.Net.Http;
//using System.Threading.Tasks;
//using Microsoft.Extensions.Configuration;

//public class RegisterService
//{
//    private readonly HttpClient _httpClient;
//    private readonly IConfiguration _configuration;

//    public RegisterService(HttpClient httpClient, IConfiguration configuration)
//    {
//        _httpClient = httpClient;
//        _configuration = configuration;
//    }

//    public async Task RegisterWithDiscoveryServiceAsync()
//    {
//        var serviceAddress = "http://localhost:8080";
//        var serviceName = "your-service-name";
//        var payload = new { ServiceName = serviceName, ServiceAddress = serviceAddress };
//        try
//        {
//            var response = await _httpClient.PostAsync("http://localhost:5084", new HttpContent());

//            if (response.IsSuccessStatusCode)
//            {
//                Console.WriteLine($"Successfully registered {serviceName} at {serviceAddress}");
//            }
//            else
//            {
//                Console.WriteLine($"Failed to register {serviceName}. Status code: {response.StatusCode}");
//            }
//        }
//        catch (Exception ex)
//        {
//            Console.WriteLine($"An error occurred during registration: {ex.Message}");
//        }
//    }
//}
