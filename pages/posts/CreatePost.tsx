import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import FormTextArea from "../../components/form/FormTextArea";
import defaultProfile from "../../media/defaults/old-missing-profile.png";
import { FileImageOutlined } from "@ant-design/icons";
import { usePostsPostMutation } from "../../api/posts";
import FormFileInputButton from "../../components/form/FormFileInputButton";
import { usePostIpfsUploadMutation } from "../../api/ipfs";

const CreatePostContainer = styled.div`
    display: flex;
    font-family: Poppins, Open Sans;
    border-bottom: 1px solid #ebebeb;
`;

const CreatePostProfileImage = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin: 50px 20px;
`;

const CreatePostForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
`;

const CreatePostBottomActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
`;

const CreatePostAttachments = styled.div`
    display: flex;
`;

const CreatePostAttachment = styled(FormFileInputButton)`
    height: 37px;
    width: 37px;
    background-color: #FF81EB;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 22px;

    :hover {
        background-color: #fb5de1;
    }
`;

const CreatePostButton = styled.button<{ $disabled: boolean }>`
    font-family: Poppins, Open Sans;
    font-size: 22px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 5px 40px;
    border-radius: 50px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
    opacity: ${props => props.$disabled ? 0.7 : 1};

    :hover {
        background-color: #fb5de1;
    }
`;

const ImagePreview = styled.img`
    width: 75%;
`;

interface CreatePostProps {
    profileImageUrl?: string;
    refetch: () => void;
    title?: string;
    buttonText?: string;
    childOf?: number;
}

const CreatePost = memo(({ profileImageUrl, refetch, title, buttonText, childOf }: CreatePostProps) => {
    const [postText, setPostText] = useState<string>(null);
    const [postImageFile, setPostImageFile] = useState<File>(null);
    const [postImagePreview, setPostImagePreview] = useState<string | ArrayBuffer>(null);

    const [postIpfsUpload] = usePostIpfsUploadMutation();

    const [postsPost, {
        isSuccess: isPostsPostSuccess
    }] = usePostsPostMutation();

    const handlePostSubmit = async () => {
        let imageUrl = null;
        if (postImageFile) {
            const formData = new FormData();
            formData.append("image", postImageFile);
            const ipfsResponse = await postIpfsUpload(formData);
            imageUrl = ipfsResponse.data.ipfsUrl;
        }
        postsPost({
            childOf,
            text: postText,
            imageUrl
        });
    };

    useEffect(() => {
        if (isPostsPostSuccess) {
            refetch();
        }
    }, [isPostsPostSuccess, refetch]);

    return (
        <CreatePostContainer>
            <CreatePostProfileImage src={profileImageUrl || defaultProfile} />
            <CreatePostForm>
                <FormTextArea label={title || "Create a Post"} onChange={(value) => setPostText(value)} />
                {postImagePreview && <ImagePreview src={postImagePreview} />}
                <CreatePostBottomActions>
                    <CreatePostAttachments>
                        <CreatePostAttachment onData={value => setPostImagePreview(value)} onFile={file => setPostImageFile(file)}>
                            <FileImageOutlined />
                        </CreatePostAttachment>
                    </CreatePostAttachments>
                    <CreatePostButton $disabled={!postText} onClick={handlePostSubmit}>
                        {buttonText || "Post"}
                    </CreatePostButton>
                </CreatePostBottomActions>
            </CreatePostForm>
        </CreatePostContainer>
    );
});

export default CreatePost;