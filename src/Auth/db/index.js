import { firebase } from '../Auth'

// TODO:
// Get userId from some kind of hook so i dont need to pass it as argument
// Fix envirement variables for now deploy

export const addExperience = ({
  userId = 'RANDOM DUDE',
  title,
  story,
  date,
  isPublic,
  categories,
}) => {
  if (typeof window !== 'undefined') {
    console.log('INCOME', { userId, title, story, date, isPublic, categories })
    return firebase
      .firestore()
      .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
      .add({
        userId,
        title,
        date,
        story,
        isPublic,
        categories,
      })
  }
}

// const addNote = () => {
//   firebase
//     .firestore()
//     .collection("notes")
//     .add({
//       title,
//       body
//     });

//   setTitle("");
//   setBody("");
// };

/*

rules_version = '2';
service cloud.firestore {    
  match /databases/{database}/documents {      
    match /posts/{docId} {    
    allow read, write, update: 
      if resource.data.owner_id == request.auth.uid
   } 
  }  
} 




*/
