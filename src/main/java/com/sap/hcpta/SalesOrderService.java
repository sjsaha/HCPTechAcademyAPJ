package com.sap.hcpta;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.springframework.stereotype.Service;

import com.sap.hcpta.jco.JCoSalesOrderProvider;

@Service("salesorderService")
@Path("/so.svc")
@Produces({ "application/json" })
/**
 * Class <code>SalesOrderService</code> provides the REST service endpoints to provide salesorder/flight details 
 * The UI of the sample application interacts with those REST endpoints to 
 * access data from the underlying ABAP system. 
 */
public class SalesOrderService {

	// query parameter "fp" specifies which FlightProvider to use, its value is
	// one of FlightProviderEnum
	private final static String QUERY_PARAM_FLIGHT_PROVIDER = "fp";
	
	// list of supported salesorder providers; right now, only a JCo salesorder provider is available, later on  this might 
	// be extended to e.g. also offer an odata salesorder provider
	private enum SalesOrderProviderEnum {
		jco
	};
	
	/** mapping between airport cities to countries; for now, this list is hard coded */
	private static HashMap<String, String> countries;
	static {
		countries = new HashMap<String, String>();
		countries.put("BERLIN", "DE");
		countries.put("FRANKFURT", "DE");
		countries.put("NEW YORK", "US");
		countries.put("ROME", "IT");
		countries.put("SAN FRANCISCO", "US");
		countries.put("SINGAPORE", "SG");
		countries.put("TOKYO", "JP");
	}
	
	@GET
	@Path("/salesorderoffline")
	@Produces("application/json")
	public String getCityList(@Context HttpServletRequest req) {
		StringBuilder citiesList = new StringBuilder(512);
		Iterator<Entry<String, String>> it = countries.entrySet().iterator();
		citiesList.append("{\"data\":[");
		while (it.hasNext()) {
			Map.Entry<String, String> entry = it.next();
			citiesList.append("{");
			citiesList.append("\"cty\":\"").append(entry.getKey()).append("\",");
			citiesList.append("\"cntry\":\"").append(entry.getValue()).append("\"");
			citiesList.append("},");
		}
		int length = citiesList.length();
		if (length>1) citiesList.setLength(length-1);
		citiesList.append("]}");		
		return citiesList.toString();  
	}

	@GET
	@Path("/salesorder/{customer_number}/{sales_organization}")
	@Produces("application/json")
	/**
	 * Returns the salesorder list.
	 * 
	 * @param req The {@link HttpServletRequest} that is processed
	 * @return the salesorder list as json string
	 */
	public String getSalesOrderList(@Context HttpServletRequest req, @PathParam("customer_number") String customer_number,
			@PathParam("sales_organization") String sales_organization) {
		SalesOrderProvider salesorderProvider = getSalesOrderProvider(req);
		String salesorderList = salesorderProvider.getSalesOrderList(customer_number, sales_organization);
		return salesorderList;
	}
	
	@GET
	@Path("/flights/{cityFrom}/{cityTo}")
	@Produces("application/json")
	/**
	 * Returns the flight list.
	 * 
	 * @param req The {@link HttpServletRequest} that is processed
	 * @return the flight list as json string
	 */
	public String getFlightList(@Context HttpServletRequest req, @PathParam("cityFrom") String cityFrom,
			@PathParam("cityTo") String cityTo) {
		SalesOrderProvider flightProvider = getSalesOrderProvider(req);
		String flightList = flightProvider.getFlightList(cityFrom, cityTo);
		return flightList;
	}

	
	
	/**
	 * Read flight provider type from "fp" query parameter and return related
	 * <code>FlightProvider</code> implementation class. If query parameter is
	 * missing, <code>JCoFlightProvider</code> is returned as default.
	 */
	private SalesOrderProvider getSalesOrderProvider(HttpServletRequest req) {
		String value = req.getParameter(QUERY_PARAM_FLIGHT_PROVIDER);

		SalesOrderProviderEnum fp = (value == null) ? SalesOrderProviderEnum.jco : SalesOrderProviderEnum.valueOf(value);
		switch (fp) {
		case jco:
			return new JCoSalesOrderProvider();
		}

		throw new IllegalStateException("should never happen");
	}

}
