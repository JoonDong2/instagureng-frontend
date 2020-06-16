노마드 코더님의 인스타그램 클론코딩 강의에 기반하고 있습니다.
자바스크립트와 JSX에 익숙하거나 강의를 수강하신 분을 대상으로 작성하였습니다.  
  
**다른점**
```
1. Prisma2 사용
2. 백앤드를 AWS 람다로 구현
3. 인증 수단으로 AWS Cognito 사용
4. 멀티 사진 선택기, 인스타그램 댓글 UI 카피 등
```
참조 : [준동's 인스타그램 클론코딩 ](https://joondong.tistory.com/92)
# 빌드 및 테스트
    yarn start
  
# 수정할 내용
### 1. src/Apollo/Client.js
ENDPOINT 설정  
  
**예제**
```
export default new ApolloClient({
    uri:"https://21eftadr1e.execute-api.ap-northeast-2.amazonaws.com/dev/apollo",
    clientState: {
        ...
    },
    request: async operation => {
        ...
    }
});

export default options;
```
### 2. src/aws-exports.js
`amplify push` 명령어에 의해 자동으로 생성된 `aws-exports.js` 파일의 내용을 그대로 입력.  
참조: [Amplify 초기화](https://joondong.tistory.com/99)  
  
**예제**
```
const awsmobile = {
    "aws_project_region": "ap-northeast-2",
    "aws_cognito_identity_pool_id": "ap-northeast-2:12d51b9d-0f4e-147e-bd85-156d65485f5e",
    "aws_cognito_region": "ap-northeast-2",
    "aws_user_pools_id": "ap-northeast-2_FEIFOERD4",
    "aws_user_pools_web_client_id": "5ydi4sytdssvdj15d6jjyysvkk",
    "oauth": {
        "domain": "joondong3.auth.ap-northeast-2.amazoncognito.com",
        "scope": [
            "email",
            "openid",
            "profile",
        ],
        "redirectSignIn": "exp://192.168.43.217:19000/--/", // expo clinet 사용시
        "redirectSignOut": "exp://192.168.43.217:19000/--/", // expo clinet 사용시
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};
```
  
# 참조
### [관련 포스트 목록](https://joondong.tistory.com/151)
### [인스타그램 클론코딩 앱 (리액트 네이티브)](https://github.com/JoonDong2/instagureng-app)
### [인스타그램 클론코딩 백앤드](https://github.com/JoonDong2/instagureng-backend)
### [인스타그램 클론코딩 Cognito Pre-Signup 핸들러](https://github.com/JoonDong2/instagureng-cognito-presignup)