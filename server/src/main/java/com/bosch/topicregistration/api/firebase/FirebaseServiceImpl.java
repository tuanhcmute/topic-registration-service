package com.bosch.topicregistration.api.firebase;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.StorageClient;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Objects;

@Service
public class FirebaseServiceImpl implements FirebaseService {
    private final Storage storage;

    @Value("${firebase.bucketName}")
    private String bucketName;

    @Value("${firebase.imageUrl}")
    private String imageUrl;

    @Autowired
    public FirebaseServiceImpl(FirebaseApp firebaseApp, @Value("${firebase.bucketName}") String bucketName) {
        this.storage = StorageClient.getInstance(firebaseApp).bucket(bucketName).getStorage();
    }


    @Override
    public String getImageUrl(String name) {
        return String.format(imageUrl, name);
    }

    @Override
    public String save(MultipartFile file) throws IOException {
        String name = generateFileName(file.getOriginalFilename());
        BlobId blobId = BlobId.of(bucketName, Objects.requireNonNull(name));
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
        Blob blob = storage.create(blobInfo, file.getBytes());
        return getImageUrl(blob.getName());
    }

    @Override
    public Boolean isFileExist(String imageUrl) {
        BlobId blobId = BlobId.of(bucketName, "76336eae-5579-483e-9e41-33503b852005.jpg");
        Blob blob = storage.get(blobId);
        return Objects.nonNull(blob);
    }

    @Override
    public String save(BufferedImage bufferedImage, String originalFileName) throws IOException {
//        byte[] bytes = getByteArrays(bufferedImage, getExtension(originalFileName));
//
//        Bucket bucket = StorageClient.getInstance().bucket();
//
//        String name = generateFileName(originalFileName);
//
//        Blob blob = bucket.create(name, bytes);
//
//        return blob.getMediaLink();
        return null;
    }

    @Override
    public void delete(String name) {
        if (StringUtils.isEmpty(name)) throw new BadRequestException("File name is not valid");
        BlobId blobId = BlobId.of(bucketName, name);
        storage.delete(blobId);
    }
}
