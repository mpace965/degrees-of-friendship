package siteClasses;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class LastfmNode implements Node {

	private ArrayList<Node> connections;
	private String nodeID;
	private JsonObject jsonOb;

	public LastfmNode(String nodeID) {
		this.nodeID = nodeID;
		this.jsonOb = makeJson(nodeID);
	}

	public JsonObject getJson() {
		return this.jsonOb;
	}

	public boolean addConnection(Node node) {
		if (this.connections == null)
			this.connections = new ArrayList<Node>();
		return this.connections.add(node);
	}

	public ArrayList<Node> getConnections() {
		return this.connections;
	}

	public String getNodeID() {
		return this.nodeID;
	}

	public Object getNodeVal() {
		return this.getJson();
	}

	// TODO: All api requests should be done directly 
	// from the site class, not the node class. 
	// The node class is supposed to be a simple Java object
	private JsonObject makeJson(String a) {
		String urlStart = "http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&format=json";
		String artist = "&artist=" + a;
		String key = "&api_key=" + "c6c45e68f6b2a663da996fc504cf9f8b";
		String url = urlStart + artist + key;
		JsonObject simArt = null;
		
		// Builds a buffered reader to interpret input received from the API request
		try {
			URL lastfmGetSimilar = new URL(url);
			URLConnection lfmSim = lastfmGetSimilar.openConnection();
			BufferedReader in;
			in = new BufferedReader(new InputStreamReader(
					lfmSim.getInputStream()));

			// Reads in a string received from the API requests
			StringBuilder builder = new StringBuilder();
			String inputLine = null;
			while ((inputLine = in.readLine()) != null) {
				builder.append(inputLine);
			}

			// Closes the buffered reader
			in.close();

			// Converts the string to a Json object
			JsonParser parser = new JsonParser();
			simArt = parser.parse(builder.toString()).getAsJsonObject();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return simArt;
	}
}
