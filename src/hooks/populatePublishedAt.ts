// import { CollectionBeforeChangeHook } from "payload"

// export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, req, operation }) => {
//   if (operation === 'create' || operation === 'update') {
//     if (req.body && !req.body.publishedAt) {
//       const now = new Date()
//       return {
//         ...data,
//         publishedAt: now,
//       }
//     }
//   }

//   return data
// }
