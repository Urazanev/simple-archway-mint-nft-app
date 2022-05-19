import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ipfsClient from "../services/ipfs";
import { useWeb3Context } from "../context/web3Context";
import TextField from "@mui/material/TextField";
import { IPFS_PREFIX, IPFS_SUFFIX } from "../config/const";
import Button from "@mui/material/Button";

const MintNft = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { mintNft, setError } = useWeb3Context();
  const [file, setFile] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      console.log("filed: ", acceptedFiles[0]);
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  useEffect(() => {
    return () => URL.revokeObjectURL(file?.preview);
  }, []);

  const uploadImgAndSendTx = () => {
    console.log(name, description);
    console.log(file);

    // Art upload
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async (event) => {
      let image = event.target.result;
      try {
        let uploadResult = await ipfsClient.upload(image);
        console.log("Successfully uploaded art", [
          uploadResult,
          String(uploadResult.cid),
        ]);
        await mintNft({
          name,
          description,
          image: IPFS_PREFIX + String(uploadResult.cid) + IPFS_SUFFIX,
        });
        setName("");
        setDescription("");
        setFile(null);
      } catch (e) {
        console.error("Error uploading file to IPFS: ", e);
        setError(e.message);
      }
    };
    reader.onerror = (e) => {
      console.error("Error uploading file to IPFS: ", e);
      setError(e.message);
    };
  };
  return (
    <section className="page-section" id="contact">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-heading text-uppercase">Create New NFT</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div
              {...getRootProps({
                className: "dropzone text-center upload-img",
              })}
            >
              <input {...getInputProps()} />
              <p className="btn btn-light text-middle">
                {file?.preview ? "Change" : "Click to select image"}
              </p>
              <img
                className="h-100 rounded"
                src={file?.preview ?? "/no-image.png"}
                onLoad={() => {
                  URL.revokeObjectURL(file?.preview);
                }}
              />
            </div>
            <div className="card-body p-4">
              <div className="text-center mt-4">
                <TextField
                  label="Title"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="text-center mt-4">
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  minRows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                <Button
                  variant="contained"
                  onClick={uploadImgAndSendTx}
                  size="large"
                  disabled={!name || !description || !file}
                >
                  Mint NFT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintNft;
