//package com.ecowatch;
//
//import com.ecowatch.model.SensorData;
//import com.ecowatch.model.User;
//import com.ecowatch.repository.SensorDataRepository;
//import com.ecowatch.repository.UserRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataInitializer implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final SensorDataRepository sensorDataRepository;
//
//    public DataInitializer(UserRepository userRepository, SensorDataRepository sensorDataRepository) {
//        this.userRepository = userRepository;
//        this.sensorDataRepository = sensorDataRepository;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        User u1 = new User();
//        u1.setName("Alice");
//        u1.setEmail("alice@example.com");
//        u1.setPassword("password"); // will be hashed when registered via service, but inserted raw here for demo
//        userRepository.save(u1);
//
//        SensorData s1 = new SensorData();
//        s1.setSensorType("temperature");
//        s1.setValue(29.5);
//        s1.setUnit("°C");
//        s1.setUser(u1);
//        sensorDataRepository.save(s1);
//
//        SensorData s2 = new SensorData();
//        s2.setSensorType("air-quality");
//        s2.setValue(72.0);
//        s2.setUnit("AQI");
//        s2.setUser(u1);
//        sensorDataRepository.save(s2);
//    }
//}
