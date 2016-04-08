package siteClasses;

import java.util.ArrayList;

public interface Node {
	/**
	 * @param node
	 * @return if connection is added
	 */
	public abstract boolean addConnection(Node node);
	
	/**
	 * Always check if this value is null before operating on it
	 * @return connections if they've been populated, null otherwise
	 */
	public abstract ArrayList<Node> getConnections();
	
	/**
	 * @return String value of the nodeID
	 */
	public abstract String getNodeID();
	
	/**
	 * @return String for debugging purposes
	 */
	public abstract String toString();
}