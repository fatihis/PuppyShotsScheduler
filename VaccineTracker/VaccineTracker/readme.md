    		            Puppy Vaccine Tracker
    		    .Net Core 3.1 based React.js Application

!!!!YOU CAN READ README.DOCX for photo-guide!!!
How to build
Assuming you have .Net Core SDK, React.js, MySql Server and Node.js on your system; first you need to build a .Net Core Web API project. You can use either Visual Studio or Command Prompt (Powershell for Windows 10). If you are going to build it with Visual Studio you can just jump steps below. Then you have to create react app with node.js npm.

1. Determine path of your project then use cd to take you there

2)Build .Net Core solution with “dotnet new webapi -o ProjectName –no—https”
3)Build react app with node.js npx with following line “npx create-react-native-app ClientApp”

4)Link platforms within your .Net Core Application
a)Install NuGet packages ASP.NET Core SPA Services and ASP.NET Core SPA Services Extensions (You can do it easily with NuGet Manager on visual studio but you have to install extension NuGet Gallery on VS code then you can install both packages)

b) startup.cs file contains Startup class which triggers at first when application launches so we need to make changes.
add SpaStaticFiles in ConfigureServices method

services.AddMvc(option => option.EnableEndpointRouting = false);
services.AddSpaStaticFiles(configuration =>
{
configuration.RootPath = "weatherclient/build";
});

Also add following code to your Configure method
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();
app.UseMvc();
app.UseSpa(spa =>
{
spa.Options.SourcePath = Path.Join(env.ContentRootPath, "weatherclient");

    if (env.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }

});
Now we are set!
Updated: 03:59 09.10.2020
