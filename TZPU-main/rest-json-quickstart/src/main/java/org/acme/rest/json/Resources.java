package org.acme.rest.json;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.inject.Inject;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.netty.util.internal.ThreadLocalRandom;

@Path("/Predmet")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class Resources {

    public Resources() 
    {
        
    }

    public String Vrati_prosek_minimum(String ime, Predmet[] predmeti, boolean minimum)
    {
        int sum=0;
        int num=0;
        int min=Integer.MAX_VALUE;
        int min_val = 10;
        int max_val = 40;
        ThreadLocalRandom tlr = ThreadLocalRandom.current();
        int randomNum = tlr.nextInt(min_val, max_val + 1);
        for(Predmet p : predmeti)
        {
            if(p.ime.equals(ime))
            {
                num++;
                sum+=p.trajanje;
                sum+=p.dodatno_vreme;
                if(minimum)
                {
                    if(p.trajanje+p.dodatno_vreme<min)
                    {
                        min=p.trajanje+p.dodatno_vreme;
                    }
                }
            }
        }
        if(minimum && min!=Integer.MAX_VALUE)
        {
            return "[{"+"\""+"ime"+"\""+":"+"\""+ime+"\""+","+"\""+"trajanje"+"\""+":"+min+","+"\""+"brucenika"+"\""+":"+randomNum+"}]";
        }
        else
        {
            
            return "[{"+"\""+"ime"+"\""+":"+"\""+ime+"\""+","+"\""+"trajanje"+"\""+":"+sum/num+","+"\""+"brucenika"+"\""+":"+randomNum+"}]";
        }
    }

    @Path("/Prosek/{predmet}")
    @GET
    public String prosek(@PathParam("predmet") String predmet) throws MalformedURLException, IOException
    {
        try{
         String filePath = "D:\\Faculty of Electronic Engineering\\TZPU\\Projekat\\TZPU-main\\rest-json-quickstart\\src\\main\\java\\org\\acme\\rest\\json\\Podaci.json";
         Predmet[] predmeti = new ObjectMapper().readValue(new File(filePath), Predmet[].class);
         String rezultat = Vrati_prosek_minimum(predmet, predmeti, false);
         return rezultat;
         }catch(IOException e){
              e.printStackTrace();
              return "greska";
         }

    }
    @Path("/Minimum/{predmet}")
    @GET
    public String minimum(@PathParam("predmet") String predmet) throws MalformedURLException, IOException
    {
        try{
         String filePath = "D:\\Faculty of Electronic Engineering\\TZPU\\Projekat\\TZPU-main\\rest-json-quickstart\\src\\main\\java\\org\\acme\\rest\\json\\Podaci.json";
         Predmet[] predmeti = new ObjectMapper().readValue(new File(filePath), Predmet[].class);
         String rezultat = Vrati_prosek_minimum(predmet, predmeti, false);
         return rezultat;
         }catch(IOException e){
              e.printStackTrace();
              return "greska";
         }

    }
   

}
