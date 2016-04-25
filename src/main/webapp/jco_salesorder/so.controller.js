sap.ui.controller("jco_salesorder.so",
		{

			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created. Can be
			 * used to modify the View before it is displayed, to bind event handlers and do other one-time
			 * initialization.
			 * 
			 * @memberOf jco_salesorder.sflight
			 */
			onInit : function() {
				var oJsonModel = new sap.ui.model.json.JSONModel(this.getFlightServiceURL() + "/salesorderoffline");
				this.getView().setModel(oJsonModel);	
			},
			
			/**
			 * Returns the flight service root URL.
			 */
			getFlightServiceURL : function() {
				var sOrigin = window.location.protocol + "//" + window.location.hostname
						+ (window.location.port ? ":" + window.location.port : "");
				return sOrigin + "/jco_salesorder/rest/v1/so.svc";
			},

			/**
			 * Search flights. 	
			 */
			searchFlights : function(customernumber, salesarea, showMessage) {
				var oJsonModel = new sap.ui.model.json.JSONModel(null);
				oJsonModel.loadData(this.getFlightServiceURL() + "/salesorder/" + customernumber + "/" + salesarea, null, false);
				var oTable = this.getView().getFlightTable();
				oTable.setModel(oJsonModel);							
				oTable.bindRows("/SALES_ORDERS");	
				if (showMessage) {						
					if (oJsonModel.oData.SALES_ORDERS) {
						this.showMsgArea("info", oJsonModel.oData.SALES_ORDERS.length + " for custom number " + customernumber + " with salesarea " + salesarea + " loaded.");
					} else {
						this.showMsgArea("info", "No salesorder available for custom number " + customernumber + " and salesarea " + salesarea + ".");
					}
				}
			},
			

				
			/** 
			 * Show message area. 
			 */
			hideMsgArea : function() {
				this.getView().getMsgField().setText("");
				this.getView().getMsgViewHLayout().setVisible(false);
			},

			showMsgArea : function(iconType, msgText) {
				this.getView().getMsgField().setText(msgText);
				if (iconType === "info" || iconType === "warning" || iconType === "error" || iconType === "success") {
					this.getView().getMsgIcon().setSrc("images/" + iconType + ".png").setVisible(true);
				} else {
					this.getView().getMsgViewHLayout().setVisible(false);
				}
				this.getView().getMsgViewHLayout().setVisible(true);
			}

		});