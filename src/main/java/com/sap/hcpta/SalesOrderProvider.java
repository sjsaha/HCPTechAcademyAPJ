package com.sap.hcpta;


/**
 * Interface <code>SalesOrderProvider</code> provides the service methods to provide salesorder/flight details 
 */
public interface SalesOrderProvider {
		
	public String getSalesOrderList(String customer_number, String sales_organization);
	
	public String getFlightList(String cityFrom, String cityTo);
	
}
