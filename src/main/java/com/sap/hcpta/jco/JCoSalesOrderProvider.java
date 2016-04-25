package com.sap.hcpta.jco;

import java.util.HashMap;

import javax.servlet.http.HttpServlet;

import com.sap.hcpta.SalesOrderProvider;
import com.sap.conn.jco.JCoContext;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoStructure;

public class JCoSalesOrderProvider extends HttpServlet implements SalesOrderProvider {

	private static final long serialVersionUID = 1L;

	/** destination used by the class to access the ABAP system */
	private static final String SFLIGHT_DESTINATION = "dest_sflight";

	/** name of BAPI in ABAP system to get salesorder list */
	private static final String BAPI_SALESORDER_GETLIST = "BAPI_SALESORDER_GETLIST";
	
	/** name of BAPI in ABAP system to get flight list */
	private static final String BAPI_SFLIGHT_GETLIST = "BAPI_SFLIGHT_GETLIST";

	/** name of BAPI in ABAP system to get flight details */
	private static final String BAPI_SFLIGHT_GETDETAIL = "BAPI_SFLIGHT_GETDETAIL";

	//customer_number 2140, sales_organization 1000
	/** mapping between airport cities to countries */
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

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public JCoSalesOrderProvider() {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.sap.hcpta.SalesOrderProvider#getSalesOrderList(java
	 * .lang.String, java.lang.String)
	 */
	public String getSalesOrderList(String customer_number, String sales_organization) {

		try {			
			JCoDestination destination = JCoDestinationManager.getDestination(SFLIGHT_DESTINATION);
			JCoFunction bapisalesorderGetList = destination.getRepository().getFunction(BAPI_SALESORDER_GETLIST);

			JCoParameterList imports = bapisalesorderGetList.getImportParameterList();
			if (customer_number != null && !customer_number.isEmpty()) {
				customer_number = customer_number.toUpperCase();
				imports.setValue("CUSTOMER_NUMBER", customer_number);
				//imports.setValue("FROMCOUNTRYKEY", countries.get(cityFrom));
			}
			if (sales_organization != null && !sales_organization.isEmpty()) {
				sales_organization = sales_organization.toUpperCase();
				imports.setValue("SALES_ORGANIZATION", sales_organization);
				//imports.setValue("TOCOUNTRYKEY", countries.get(sales_organization));
			}

			bapisalesorderGetList.execute(destination);
			
			return bapisalesorderGetList.getTableParameterList().toJSON();

		} catch (JCoException e) {
			throw new RuntimeException(e);
		}
	}
	
	public String getFlightList(String cityFrom, String cityTo) {

		try {			
			JCoDestination destination = JCoDestinationManager.getDestination(SFLIGHT_DESTINATION);
			JCoFunction bapiSflightGetList = destination.getRepository().getFunction(BAPI_SFLIGHT_GETLIST);

			JCoParameterList imports = bapiSflightGetList.getImportParameterList();
			if (cityFrom != null && !cityFrom.isEmpty()) {
				cityFrom = cityFrom.toUpperCase();
				imports.setValue("FROMCITY", cityFrom);
				imports.setValue("FROMCOUNTRYKEY", countries.get(cityFrom));
			}
			if (cityTo != null && !cityTo.isEmpty()) {
				cityTo = cityTo.toUpperCase();
				imports.setValue("TOCITY", cityTo);
				imports.setValue("TOCOUNTRYKEY", countries.get(cityTo));
			}

			bapiSflightGetList.execute(destination);
			
			return bapiSflightGetList.getTableParameterList().toJSON();

		} catch (JCoException e) {
			throw new RuntimeException(e);
		}
	}

}