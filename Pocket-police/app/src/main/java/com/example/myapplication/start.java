package com.example.myapplication;

import com.example.myapplication.firebase.gpsSaver;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.telephony.SmsManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Queue;

import static java.lang.StrictMath.abs;

public class start extends AppCompatActivity {
    private DatabaseReference mDatabase;
    String data_address;
    String data_num;
    String[] permission_list = {
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.SEND_SMS,

    };
    Double goal_latitude;
    Double goal_longitude;

    FirebaseAuth mAuth = FirebaseAuth.getInstance();
    final String nowuser = mAuth.getCurrentUser().getUid();
    gpsSaver gps = new gpsSaver(nowuser);

    //????????? ?????? ????????? ??????
    private SensorManager sensorManager=null;
    private Sensor sensor=null;

    //????????????
    private Socket socket;
    private String ip = "203.255.81.66";
    private int port = 1319;
    public static Queue<String> dataQueue = new LinkedList<>();
    private Thread mSendThread;
    private Thread mRecvThread;
    private static String namename;
    String input_phonenum;
    boolean smsCnt;
    //String input_phonenum="01090616840";
    String message="?????? ???????????? ?????????????????????.";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        smsCnt=false;
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
        ActionBar ab = getSupportActionBar();
        ab.setIcon(R.drawable.pocketpolice_icon);
        ab.setDisplayUseLogoEnabled(true);
        ab.setDisplayShowHomeEnabled(true);


//???????????????
        data_address = getIntent().getStringExtra("input_address");

        Location input_loc=findGeoPoint(this,data_address);
        checkPermission();
        //??????????????? ??????
        sensorManager=(SensorManager)getSystemService(Context.SENSOR_SERVICE);
        sensor=sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        sensorManager.registerListener(mySensorListener,sensor,2000000);
        //firebase ??????
        mDatabase=FirebaseDatabase.getInstance().getReference();

        mDatabase.child("Users").child(nowuser).child("name").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                namename =dataSnapshot.getValue().toString();
            }
            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
            }
        });
        input_phonenum=getIntent().getStringExtra("input_phonenum");

//????????????
        goal_latitude=input_loc.getLatitude();
        goal_longitude=input_loc.getLongitude();

        final LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        final LocationListener locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                double latitude = 0;
                double longitude = 0;

                if (location != null) {
                    latitude = location.getLatitude();
                    longitude = location.getLongitude();

                }
                Double currentLatitude = location.getLatitude();
                Double currentLongitude = location.getLongitude();

                String lati = String.valueOf(currentLatitude);
                String longi = String.valueOf(currentLongitude);
                gps.saveGPS(lati + "," + longi);
            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {
            }

            @Override
            public void onProviderEnabled(String provider) {
            }

            @Override
            public void onProviderDisabled(String provider) {
            }
        };

        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);

        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 30000, 0, locationListener);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 30000, 0, locationListener);


        //?????? ?????? ?????????
        Button button1 = (Button) findViewById(R.id.btn_arriving);

        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                checkPermission();
                Location nowlocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);

                double now_longi=abs(nowlocation.getLongitude());
                double now_lati=nowlocation.getLatitude();

                Log.d("test nowloc lati", String.valueOf(now_lati));
                Log.d("test nowloc longi", String.valueOf(now_longi));

                Log.d("test goal_latitude", String.valueOf(goal_latitude));
                Log.d("test goal_longitude", String.valueOf(goal_longitude));

                if(now_lati>=goal_latitude-0.002&&now_lati<=goal_latitude+0.002&&now_longi>=goal_longitude-0.002&&now_longi<=goal_longitude+0.002){
                    Intent intent1 = new Intent(getApplicationContext(), arriving_complete.class);
                    startActivity(intent1);
                    locationManager.removeUpdates(locationListener);
                }
                else{
                    Toast.makeText(getApplicationContext(),"??? ????????? ???????????? ????????? ????????? ????????????.",Toast.LENGTH_LONG).show();
                }
            }
        });

        new ConnectThread(new InetSocketAddress(ip,port)).start();
    }


    class ConnectThread extends Thread {
        SocketAddress addr;

        public ConnectThread(SocketAddress addr) {
            this.addr = addr;
        }

        public void run() {
            try {
                socket = new Socket();
                socket.connect(addr);

                mSendThread= new SendThread();
                mSendThread.start();
                mRecvThread = new RecvThread();
                mRecvThread.start();
            } catch (Exception ioe) {
            }
        }
    }

    class RecvThread extends Thread {
        public RecvThread() {

        }

        @Override
        public void run() {
            while (!isInterrupted()) {
                try {
                    byte[] header = new byte[4];
                    socket.getInputStream().read(header, 0, 4);
                    ByteBuffer b = ByteBuffer.wrap(header);
                    b.order(ByteOrder.LITTLE_ENDIAN);
                    int value = b.getInt();
                    if (value == 0) {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                sendSMS();
                                Toast.makeText(getApplicationContext(),"????????????",Toast.LENGTH_SHORT).show();
                                new AlertDialog.Builder(start.this)
                                        .setTitle("?????? ????????????")
                                        .setMessage(input_phonenum + "?????? ?????? ??????")
                                        .setPositiveButton("??? ????????????", new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                finish();
                                            }
                                        })
                                        .setNegativeButton("????????????",new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                dialog.cancel();
                                                smsCnt=false;
                                            }
                                        }).show();
                            }
                        });
                    }
                } catch (IOException e) {
                    //e.printStackTrace();
                }
            }
        }
    }

    private void sendSMS() {
        if(smsCnt==false){
            try {
                SmsManager smsManager = SmsManager.getDefault();
                String msg =  "www.brillbe.kro.kr:8080/?uid=" + nowuser + "&name=" + namename;
                //String msg="1234";
                PendingIntent sentPI;
                sentPI = PendingIntent.getBroadcast(this, 0, new Intent(msg), 0);
                smsManager.sendTextMessage(input_phonenum, null, msg, sentPI, null);
                //Toast.makeText(start.this,namename+"?????? ??????????????? ??????????????? ?????? ?????????????????? ???????????????"+"http://www.brillbe.kro.kr:8080/?uid="+nowuser+"&name="+namename,Toast.LENGTH_LONG).show();
            } catch (Exception ex) {
                Toast.makeText(start.this,"?????? ?????? ??????",Toast.LENGTH_LONG).show();
            }
            smsCnt=true;
        }
    }

    class SendThread extends Thread {
        public SendThread() {
        }

        @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
        public void run() {
            while (!isInterrupted()) {
                try {
                    String result = dataQueue.poll();
                    byte[] bytes = result.getBytes();
                    ByteBuffer b = ByteBuffer.allocate(4);
                    b.order(ByteOrder.LITTLE_ENDIAN);
                    b.putInt(bytes.length);
                    socket.getOutputStream().write(b.array(), 0, 4);
                    socket.getOutputStream().write(bytes);
                    socket.getOutputStream().flush();

                } catch (Exception ex) {
                }
            }
        }
    }

    class CloseThread extends Thread {
        public CloseThread() {
        }

        @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
        public void run() {
            try {
                if (mSendThread != null) {
                    mSendThread.interrupt();
                    mSendThread = null;
                }
                if (mRecvThread != null) {
                    mRecvThread.interrupt();
                    mRecvThread = null;
                }
                if (socket == null || !socket.isClosed()) {
                    socket.close();
                    socket = null;
                }
            } catch (Exception ex) {
            }
        }
    }

    @Override
    protected void onDestroy() {
        (new CloseThread()).start();
        super.onDestroy();
    }



    private void checkPermission() {
        if(Build.VERSION.SDK_INT<Build.VERSION_CODES.M)
            return;

        for(String permission: permission_list){
            int chk=checkCallingOrSelfPermission(permission);
            if(chk== PackageManager.PERMISSION_DENIED){
                requestPermissions(permission_list,0);
            }
        }
    }
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode==0)
        {
            for(int i=0; i<grantResults.length; i++)
            {
                //???????????????
                if(grantResults[i]==PackageManager.PERMISSION_GRANTED){
                }
                else {
                    Toast.makeText(getApplicationContext(),"????????????????????????",Toast.LENGTH_LONG).show();
                    finish();
                }
            }
        }
    }
    public static Location findGeoPoint(Context mcontext, String address) {
        Location loc = new Location("");
        Geocoder coder = new Geocoder(mcontext,Locale.KOREA);

        List<Address> addr = null;// ???????????? ?????? ??????????????? ????????? ????????????????????? ??????????????? ???????????? ?????? ??????

        try {
            addr = coder.getFromLocationName(address, 5);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }// ?????? ????????? ????????? ???????????? ?????? 1~5??? ????????? ??????
        if (addr != null) {
            for (int i = 0; i < addr.size(); i++) {
                Address lating = addr.get(i);
                double lat = lating.getLatitude(); // ??????????????????
                double lon = lating.getLongitude(); // ??????????????????
                loc.setLatitude(lat);
                loc.setLongitude(lon);
            }
        }
        return loc;
    }

    class Point {
        // ??????
        public double x;
        // ??????
        public double y;
        public String addr;
        // ???????????? ???????????? ??????
        public boolean havePoint;

        @Override
        public String toString() {
            StringBuilder builder = new StringBuilder();
            builder.append("x : ");
            builder.append(x);
            builder.append(" y : ");
            builder.append(y);
            builder.append(" addr : ");
            builder.append(addr);

            return builder.toString();
        }
    }
    //?????? ????????? ?????????
    public SensorEventListener mySensorListener = new SensorEventListener() {
        private float accX;
        private float accY;
        private float accZ;
        @Override
        public void onSensorChanged(SensorEvent event) {
            if(event.sensor.getType()==Sensor.TYPE_ACCELEROMETER){
                accX=event.values[0];
                accY=event.values[1];
                accZ=event.values[2];
                dataQueue.offer(accX + ";" + accY + ";" + accZ);
                //?????? ??? ??? ??? ??????
            }
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    };


}