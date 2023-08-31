package com.Group1.PetRadar.Service.Implementation;

import com.Group1.PetRadar.DTO.pet.AddPetDTO;
import com.Group1.PetRadar.Model.MedicalHistory;
import com.Group1.PetRadar.Model.PetprofileModel;
import com.Group1.PetRadar.Model.User;
import com.Group1.PetRadar.Repository.PetProfileRepository;
import com.Group1.PetRadar.Repository.UserRepository;
import com.Group1.PetRadar.Service.PetProfileService;
import com.Group1.PetRadar.utils.AwsService;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.imageio.ImageIO;

@Service
public class PetProfileServiceImplementation implements PetProfileService {
    @Autowired
    PetProfileRepository petprofileRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AwsService awsService;

    @Override
    public PetprofileModel savePetProfile(AddPetDTO petDetails) {
        User user = userRepository.findById(petDetails.getUserId()).get();
        PetprofileModel newPet = new PetprofileModel();

        newPet.setPetName(petDetails.getPetName());
        newPet.setPetBreed(petDetails.getPetBreed());
        newPet.setAge(petDetails.getAge());
        newPet.setPetCategory(petDetails.getPetCategory());
        newPet.setGender(petDetails.getGender());
        newPet.setBio(petDetails.getBio());
        newPet.setPetHeightInCms(petDetails.getPetHeightInCms());
        newPet.setPetIdentificationMarks(petDetails.getPetIdentificationMarks());
        newPet.setWeightInLbs(petDetails.getWeightInLbs());
        newPet.setWeightInLbs(petDetails.getWeightInLbs());
        newPet.setAllergies(petDetails.getAllergies());
        newPet.setImageUrl(awsService.save(petDetails.getImage()));
        newPet.setUser(user);
        newPet = petprofileRepository.save(newPet);

        try {
            String petRadarWebUrl = "http://129.173.67.181:3000/";
            BufferedImage QrData = generateQRCodeImage(petRadarWebUrl + newPet.getPetId().toString());
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(QrData, "jpeg", baos);
            byte[] byteData = baos.toByteArray();
            newPet.setPetQrImage(byteData);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        newPet = petprofileRepository.save(newPet);
        return newPet;
    }


    @Override
    public PetprofileModel getPetprofileById(UUID id) throws Exception {
        PetprofileModel petDetails = null;
        try {
            if (petprofileRepository.findByUserUserId(id).isEmpty()) {
                throw new Exception("Pet not found");
            }
            petDetails = petprofileRepository.findByUserUserId(id).get();
            return petDetails;

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("No pet profile found for given UUID");
        }
    }

    
    @Override
    public List<MedicalHistory> getmedicalByPetId(UUID id) throws Exception {
        PetprofileModel petDetails = null;
        try {
            if (!petprofileRepository.existsById(id)) {
                throw new Exception("Pet not found");
            }
            petDetails = petprofileRepository.findById(id).get();
            return petDetails.getMedicalHistories();

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("No pet profile found for given UUID");
        }
    }

    @Override
    public PetprofileModel updatePetprofile(AddPetDTO petprofileModel) {
        PetprofileModel m = petprofileRepository.findById(petprofileModel.getPetId()).orElse(null);
        if (petprofileModel.getPetName() != null)
            m.setPetName(petprofileModel.getPetName());
        if (petprofileModel.getPetBreed() != null)
            m.setPetBreed(petprofileModel.getPetBreed());
        if (petprofileModel.getAge() > 0)
            m.setAge(petprofileModel.getAge());
        if (petprofileModel.getPetCategory() != null)
            m.setPetCategory(petprofileModel.getPetCategory());
        if (petprofileModel.getGender() != null)
            m.setGender(petprofileModel.getGender());
        if (petprofileModel.getBio() != null)
            m.setBio(petprofileModel.getBio());
        if (petprofileModel.getPetHeightInCms() != null)
            m.setPetHeightInCms(petprofileModel.getPetHeightInCms());
        if (petprofileModel.getWeightInLbs() != null)
            m.setWeightInLbs(petprofileModel.getWeightInLbs());
        if (petprofileModel.getPetIdentificationMarks() != null)
            m.setPetIdentificationMarks(petprofileModel.getPetIdentificationMarks());
        if (petprofileModel.getAllergies() != null)
            m.setAllergies(petprofileModel.getAllergies());
        if (petprofileModel.getImage() != null) {
            m.setImageUrl(awsService.save(petprofileModel.getImage()));
        }
        return petprofileRepository.save(m);
    }


    @Override
    public String deletePetprofileById(UUID id) {
        petprofileRepository.deleteById(id);
        return "Petprofile deleted!";
    }

    public static BufferedImage generateQRCodeImage(String barcodeText) throws Exception {
        QRCodeWriter barcodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = null;
        int qrPixelSize=300;
        try {
            bitMatrix = barcodeWriter.encode(barcodeText, BarcodeFormat.QR_CODE, qrPixelSize, qrPixelSize);
        } catch (WriterException e) {
            throw new RuntimeException(e);
        }
        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }

    @Override
    public Map<String, Object> getPetDetailsAndOwnerById(UUID id) throws Exception {
        PetprofileModel petDetails = null;
        try {
            if (!petprofileRepository.existsById(id)) {
                throw new Exception("Pet not found");
            }
            petDetails = petprofileRepository.findById(id).get();
            petDetails.getUser();
            Map<String, Object> data = new HashMap<>();
            data.put("OwnerPhoneNumber", petDetails.getUser().getPhoneNumber());
            data.put("petDetails", petDetails);
            return data;

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("No pet profile found for given UUID");
        }
    }
}