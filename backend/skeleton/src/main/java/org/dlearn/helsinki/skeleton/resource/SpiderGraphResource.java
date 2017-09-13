package org.dlearn.helsinki.skeleton.resource;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.dlearn.helsinki.skeleton.model.SpiderGraph;
import org.dlearn.helsinki.skeleton.model.Student;
import org.dlearn.helsinki.skeleton.service.SpiderGraphService;

@Path("/")
public class SpiderGraphResource {
	
	SpiderGraphService spiderGraphService = new SpiderGraphService();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<SpiderGraph> getSpiderGraphs(@PathParam("student_id") int student_id){
		return spiderGraphService.getSpiderGraphsFromStudentId(student_id);
	}
	
	@GET
	@Path("/{spidergraph_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public SpiderGraph getSpiderGraph(@PathParam("student_id") int student_id,@PathParam("spidergraph_id") int spidergraph_id){
		return spiderGraphService.getSpiderGraphFromid(student_id,spidergraph_id);
	}
}
