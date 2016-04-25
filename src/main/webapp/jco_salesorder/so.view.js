sap.ui.jsview("jco_salesorder.so", {

		oMainHeader : null,
		oDepartureCombo : null,
		oArrivalCombo : null,
		oFlightListPanel : null,
		oMsgViewHLayout : null,
		oMsgField : null,
		oMsgIcon : null,
		oFlightsTable : null,
		oFlightDetailsForm : null,
		oFlightDetailsPanel : null,
		oFlightListPanel : null,

		/**
		 * Specifies the Controller belonging to this View. In the
		 * case that it is not implemented, or that "null" is
		 * returned, this View does not have a Controller.
		 * 
		 * @memberOf sflight-web.sflight
		 */
		getControllerName : function() {
			return "jco_salesorder.so";
		},
		

		/**
		 * Is initially called once after the Controller has been
		 * instantiated. It is the place where the UI is
		 * constructed. Since the Controller is given to this
		 * method, its event handlers can be attached right away.
		 * 
		 * @memberOf sflight-web.sflight
		 */
		createContent : function(oController) {
			this.createMainHeader(oController);
			this.createFlightSearchPanel(oController);			
			this.createFlightListPanel(oController);			
			this.createFlightDetailsPanel(oController);

			// main layout 
			var oMainLayout = new sap.ui.commons.layout.VerticalLayout({
				content : [ this.oMainHeader, this.oFlightSearchPanel, this.oFlightListPanel, this.oFlightDetailsPanel ]
			}).addStyleClass("margin-8px");

			return oMainLayout;
		},

		getFlightTable : function() {
			return this.oFlightsTable;
		},
		
		getFlightDetailsForm : function() {
			return this.oFlightDetailsForm; 
		}, 

		getMsgViewHLayout : function() {
			return this.oMsgViewHLayout;
		},

		getMsgField : function() {
			return this.oMsgField;
		},

		getMsgIcon : function() {
			return this.oMsgIcon;
		},

		/**
		 * Creates this.oFlightListPanel.
		 * @param oController
		 */
		createFlightListPanel : function(oController) {
			var that = this; 
			this.oFlightsTable = new sap.ui.table.Table({
				visibleRowCount : 30,
				selectionMode : sap.ui.table.SelectionMode.Single,
				rowSelectionChange : function(oEvent) {
					var index = that.oFlightsTable.getSelectedIndex();
					if (index > -1) {
						var selectedFlight = that.oFlightsTable.getModel().getData().FLIGHTLIST[index];
						oController.getFlightDetails(selectedFlight.CARRID, selectedFlight.CONNID, selectedFlight.FLDATE);
						that.oFlightDetailsPanel.setVisible(true);
					}
				},
				selectionBehavior : sap.ui.table.SelectionBehavior.Row
			});

			// define the columns and the control templates to be
			// used
			this.oFlightsTable.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "SalesOrder Number"
				}),
				template : new sap.ui.commons.TextView().bindProperty("text", "SD_DOC"),
				sortProperty : "SD_DOC",
				filterProperty : "SD_DOC",
				width : "20%"
			}));
			this.oFlightsTable.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Status"
				}),
				template : new sap.ui.commons.TextView().bindProperty("text", "DOC_STATUS"),
				sortProperty : "DOC_STATUS",
				filterProperty : "DOC_STATUS",
				width : "20%"
			}));
			this.oFlightsTable.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Material"
				}),
				template : new sap.ui.commons.TextView().bindProperty("text", "SHORT_TEXT"),
				sortProperty : "SHORT_TEXT",
				filterProperty : "SHORT_TEXT",
				width : "20%"
			}));
			this.oFlightsTable.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Purchase Number"
				}),
				template : new sap.ui.commons.TextView().bindProperty("text", "PURCH_NO"),
				sortProperty : "PURCH_NO",
				filterProperty : "PURCH_NO",
				width : "20%"
			}));
			this.oFlightsTable.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Netto Price"
				}),
				template : new sap.ui.commons.TextView().bindProperty("text", "NET_PRICE"),
				sortProperty : "NET_PRICE",
				filterProperty : "NET_PRICE",
				width : "20%"
			}));
			this.oFlightsTable.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Requested Date"
				}),
				template : new sap.ui.commons.TextView().bindProperty("text", "REQ_DATE"),
				sortProperty : "REQ_DATE",
				filterProperty : "REQ_DATE",
				width : "20%"
			}));

			// -------------------------
			// Flight list panel
			// -------------------------
			this.oFlightListPanel = new sap.ui.commons.Panel({
				title : new sap.ui.core.Title({
					text : "List of SalesOrders by Customer"
				})
			}).addStyleClass("padding-top-10px");
			this.oFlightListPanel.addContent(this.oFlightsTable);
		},

		/**
		 * Creates this.oFlightSearchPanel.
		 * @param oController
		 */
		createFlightSearchPanel : function(oController) {
			var that = this;
			
			// departure ComboBox
			var oDepartureLabel = new sap.ui.commons.Label({
				text : 'Customer Number'
			}).addStyleClass("padding-3px-5px-3px-19px");
			
//			this.oDepartureCombo = new sap.ui.commons.ComboBox("departureCB", {
//				change : function(oEvent) {
//					var oSearchBtn = sap.ui.getCore().getControl("searchBtn");
//					var oArrivalCombo = sap.ui.getCore().getControl("arrivalCB");
//
//					if (oArrivalCombo.getSelectedKey() && this.getSelectedKey()) {
//						oSearchBtn.setEnabled(true);
//					}
//				}
//			});
			oCustomerNumberTextField = new sap.ui.commons.TextField("customernumber1", {required:true, value:"0000001171"})
			oDepartureLabel.setLabelFor("customernumber1");

			// oDepartureComboBox data binding
//			var oSorter = new sap.ui.model.Sorter("cty", false, true);
//			this.oDepartureCombo.bindItems("/data", new sap.ui.core.ListItem({
//				key : "{cty}",
//				text : "{cty}"
//			}), oSorter, null);

			var oDepartureHLayout = new sap.ui.commons.layout.HorizontalLayout({
				content : [ oDepartureLabel, oCustomerNumberTextField ]
			});

			// arrival combo
			var oArrivalLabel = new sap.ui.commons.Label({
				text : 'Salesarea'
			}).addStyleClass("padding-3px-5px-3px-19px");
//			this.oArrivalCombo = new sap.ui.commons.ComboBox("arrivalCB", {
//				change : function(oEvent) {
//					var oSearchBtn = sap.ui.getCore().getControl("searchBtn");
//					var oDepartureCombo = sap.ui.getCore().getControl("departureCB");
//
//					if (oDepartureCombo.getSelectedKey() && this.getSelectedKey()) {
//						oSearchBtn.setEnabled(true);
//					}
//				}
//			});
			oSalesAreaTextField = new sap.ui.commons.TextField("salesarea1", {required:true, value:"1000"})
			oArrivalLabel.setLabelFor(this.oSalesAreaTextField);

//			// oArrivalComboBox data binding
//			this.oArrivalCombo.bindItems("/data", new sap.ui.core.ListItem({
//				key : "{cty}",
//				text : "{cty}"
//			}), oSorter, null);

			var oArrivalHLayout = new sap.ui.commons.layout.HorizontalLayout({
				content : [ oArrivalLabel, oSalesAreaTextField ]
			}).addStyleClass("padding-right-20px");

			// Search flight button
			var oSearchBtn = new sap.ui.commons.Button("searchBtn", {
				text : "Search",
				width : '70px',
				tooltip : "Search for SalesOrders",
				style : sap.ui.commons.ButtonStyle.Default,
				press : function() {
					var customnumber = oCustomerNumberTextField.getValue();
					var salesarea = oSalesAreaTextField.getValue();
					oController.searchFlights(customnumber, salesarea, true);
				},
				enabled : true
			});

			// messages area (only visible if a message is
			// displayed)
			this.oMsgField = new sap.ui.commons.TextView({
				text : ""
			});
			this.oMsgIcon = new sap.ui.commons.Image({
				src : "images/info.png",
				height : "16px",
				width : "16px"
			});
			this.oMsgViewHLayout = new sap.ui.commons.layout.HorizontalLayout({
				visible : false,
				content : [ this.oMsgIcon.addStyleClass("padding-0px-5px-5px-0px"), this.oMsgField,
						new sap.ui.commons.Button({
							text : "Close Message",
							tooltip : "Close the displayed message",
							style : sap.ui.commons.ButtonStyle.Default,
							press : function() {
								oController.hideMsgArea();
							}
						}).addStyleClass("margin-left-5px") ]
			}).addStyleClass("padding-top-10px");

			var oFlightPanelVLayout = new sap.ui.commons.layout.VerticalLayout({ 
				content : [ new sap.ui.commons.layout.HorizontalLayout({
					content : [ oDepartureHLayout, oArrivalHLayout, oSearchBtn ]
				}).addStyleClass("padding-top-10px"), that.oMsgViewHLayout, ]
			});

			// -------------------------
			// Flight search panel
			// -------------------------
			this.oFlightSearchPanel = new sap.ui.commons.Panel({
				title : new sap.ui.core.Title({
					text : "Search For SalesOrder"
				})
			}).addStyleClass("padding-top-10px");

			this.oFlightSearchPanel.addContent(oFlightPanelVLayout);
		},		
		
		/**
		 * Creates this.oFlightDetailsPanel.
		 * @param oController
		 */
		createFlightDetailsPanel : function(oController) {
			var that = this; 
			this.oFlightDetailsForm = new sap.ui.layout.form.SimpleForm("sf1", {
				maxContainerCols : 3, 
				content : [
						new sap.ui.core.Title({
							text : "Flight Information"
						}),
						new sap.ui.commons.Label({
							text : "Carrier ID"
						}),
						new sap.ui.commons.TextView("carrid", {
							text : "{/CARRID}"
						}),

						new sap.ui.commons.Label({
							text : "Connection ID"
						}),
						new sap.ui.commons.TextView("connid", {
							text : "{/CONNID}"
						}),

						new sap.ui.commons.Label({
							text : "Plane type"
						}),
						new sap.ui.commons.TextView({
							text : "{/PLANETYPE}"
						}),

						new sap.ui.commons.Label({
							text : "Departure"
						}),
						new sap.ui.commons.layout.HorizontalLayout({
							content : [ new sap.ui.commons.TextView({
								text : "{/CITYFROM}"
							}), new sap.ui.commons.TextView({
								text : ","
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "{/AIRPFROM}"
							}), new sap.ui.commons.TextView({
								text : ","
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "{/COUNTRYFR}"
							}) ]
						}),
						new sap.ui.commons.Label({
							text : "Arrival"
						}),
						new sap.ui.commons.layout.HorizontalLayout({
							content : [ new sap.ui.commons.TextView({
								text : "{/CITYTO}"
							}), new sap.ui.commons.TextView({
								text : ","
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "{/AIRPTO}"
							}), new sap.ui.commons.TextView({
								text : ","
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "{/COUNTRYTO}"
							}) ]
						}),

						new sap.ui.commons.Label({
							text : "Distance"
						}),
						new sap.ui.commons.layout.HorizontalLayout({
							content : [ new sap.ui.commons.TextView({
								text : "{/DISTANCE}"
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "{/DISTID}"
							}), ]
						}),

						new sap.ui.core.Title({
							text : "Booking Details"
						}),
						new sap.ui.commons.Label({
							text : "Flight date"
						}),
						new sap.ui.commons.TextView("fldate", {
							text : "{/FLDATE}"
						}),

						new sap.ui.commons.Label({
							text : "Flight duration"
						}),
						new sap.ui.commons.layout.HorizontalLayout({
							content : [ new sap.ui.commons.TextView({
								text : "{/FLTIME}"
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "min"
							}), ]
						}),

						new sap.ui.commons.Label({
							text : "Departure time"
						}),
						new sap.ui.commons.layout.HorizontalLayout({
							content : [ new sap.ui.commons.TextView({
								text : "{/DEPTIME}"
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "min"
							}), ]
						}),

						new sap.ui.commons.Label({
							text : "Arrival time"
						}),
						new sap.ui.commons.TextView({
							text : "{/ARRTIME}"
						}),

						new sap.ui.commons.Label({
							text : "Seats"
						}),
						new sap.ui.commons.layout.HorizontalLayout({
							content : [ new sap.ui.commons.TextView({
								text : "Total:"
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "{/SEATSMAX}"
							}), new sap.ui.commons.TextView({
								text : ", Occupied:"
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "{/SEATSOCC}"
							}), ]
						}),

						new sap.ui.commons.Label({
							text : "Price"
						}),
						new sap.ui.commons.layout.HorizontalLayout({
							content : [ new sap.ui.commons.TextView({
								text : "{/PRICE}"
							}), new sap.ui.commons.TextView({
								width : "3px"
							}), new sap.ui.commons.TextView({
								text : "{/CURRENCY}"
							}), ]
						}),

						new sap.ui.core.Title({
							text : "Book Now"
						}),
						new sap.ui.commons.Button({
							text : "Book Flight",
							tooltip : "Book selected flight now",
							style : sap.ui.commons.ButtonStyle.Default,
							width : "80px",
							press : function() {
								var index = that.oFlightsTable.getSelectedIndex();
								if (index > -1) { 
									var selectedFlight = that.oFlightsTable.getModel().getData().FLIGHTLIST[index];
									oController.bookFlight(selectedFlight.CARRID, selectedFlight.CONNID, selectedFlight.FLDATE);
									var cityFrom = that.oDepartureCombo.getSelectedKey();
									var cityTo = that.oArrivalCombo.getSelectedKey();
									oController.searchFlights(cityFrom, cityTo, false);									
									that.oFlightDetailsPanel.setVisible(false);
								}
							}
						}) ]
			});

			this.oFlightDetailsPanel = new sap.ui.commons.Panel({
				title : new sap.ui.core.Title({
					text : "Booking Information"
				}),
				visible : false
			});
			this.oFlightDetailsPanel.addContent(this.oFlightDetailsForm);						
		},
		
		/**
		 * Creates this.oMainHeader.
		 * @param oController
		 */
		createMainHeader : function(oController) {
			this.oMainHeader = new sap.ui.commons.layout.VerticalLayout(
					{
						content : [
								new sap.ui.commons.layout.HorizontalLayout({
									content : [ new sap.ui.commons.Image({
										src : "images/SAPLogo.gif",
										height : "16px",
										width : "32px"
									}).addStyleClass("padding-0px-5px-5px-0px"),
											new sap.ui.commons.TextView({
												text : "HANA Cloud Development Example",
												design : sap.ui.commons.TextViewDesign.H3
											}) ]
								}),
								new sap.ui.commons.layout.HorizontalLayout(
										{
											content : [
													new sap.ui.commons.TextView(
															{
																text : "Example shows how to use the JCo API in a Web Application to work with the ",
																design : sap.ui.commons.TextViewDesign.Standard
															}),
													new sap.ui.commons.Link({
														text : "SalesOrder Model of an ABAP system.",
														href : oController.getFlightServiceURL()
																+ "/salesorder/0000001172/1000",
														target : "_blank"
													}).addStyleClass("margin-left-and-right-3px") ]
										}),
								new sap.ui.commons.layout.HorizontalLayout(
										{
											content : [ new sap.ui.commons.TextView(
													{
														text : "All data is fetched from an on-premise ABAP system using the SAP HANA Cloud Connector.",
														design : sap.ui.commons.TextViewDesign.Standard
													}) ],
										}) ]
					}).addStyleClass("padding-5px-0px-10px-2px");						
		}, 
});
