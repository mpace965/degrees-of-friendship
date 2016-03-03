package siteClasses;

import java.util.ArrayList;

import org.jgrapht.util.FibonacciHeapNode;

public class Node {
	private static Site site;
	private ArrayList<Node> connections;
	private Integer nodeID;
	private int location;
	private int distance;
	private FibonacciHeapNode<Node> fibNode;

	public Node(Integer nodeID) {
		this.nodeID = nodeID;
		if (site == null) {
			
		}
	}

	public boolean addConnection(Node node) {
		return this.connections.add(node);
	}
	public boolean addConnection(ArrayList<Node> arr) {
		return this.connections.addAll(arr);
	}
	public void setDistance(int distance) {
		this.distance = distance;
	}
	public void setLocation(int location) {
		this.location = location;
	}
	public static void setSite(Site s) {
		site = s;
	}

	public ArrayList<Node> getConnections() {
		if (this.connections == null) {
			this.connections = new ArrayList<Node>();
			site.setConnections(this);
		}
		return this.connections;
	}
	public Integer getNodeID() {
		return this.nodeID;
	}
	public int getDistance() {
		return this.distance;
	}
	public int getLocation() {
		return this.location;
	}
	public FibonacciHeapNode<Node> getFibNode() {
		if (this.fibNode == null) {
			this.fibNode = new FibonacciHeapNode<Node>(this);
		}
		return this.fibNode;
	}
	public String toString() {
		return nodeID.toString();
	}
}