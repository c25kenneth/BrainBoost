"use server";
import { INote } from "@/lib/models/Note";
import Note from "@/lib/models/Note";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { revalidatePath } from "next/cache";
// {
//   "tldr": "Machine Learning is a branch of AI where systems learn from data without explicit programming. It is divided into three main paradigms — supervised, unsupervised, and reinforcement learning — and is evaluated using metrics like accuracy, precision, recall, and F1 score. A key challenge is balancing bias and variance to avoid underfitting or overfitting.",
//   "keyConcepts": [
//     "Supervised Learning: training on labeled input-output pairs (e.g. regression, classification)",
//     "Unsupervised Learning: finding hidden structure in unlabeled data (e.g. clustering, PCA)",
//     "Reinforcement Learning: agent learns via rewards/penalties from environment interaction",
//     "Overfitting: model memorizes training data, fails to generalize (high variance)",
//     "Underfitting: model too simple to capture patterns (high bias)",
//     "Bias-Variance Tradeoff: Total Error = Bias² + Variance + Irreducible Noise",
//     "Gradient Descent: iterative optimization algorithm to minimize the cost function",
//     "Cross-validation: technique to evaluate model generalization (e.g. K-Fold)",
//     "Precision vs Recall: tradeoff relevant in imbalanced classification problems",
//     "Learning Rate (α): controls step size in gradient descent; too high = diverge, too low = slow"
//   ],
//   "formulas": [
//     "MSE = (1/n) * Σ(yᵢ - ŷᵢ)²",
//     "σ(x) = 1 / (1 + e^(-x))  [Sigmoid function]",
//     "θ = θ - α * ∇J(θ)  [Gradient Descent update rule]",
//     "P(A|B) = P(B|A) * P(A) / P(B)  [Bayes Theorem]",
//     "F1 = 2 * (Precision * Recall) / (Precision + Recall)",
//     "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
//     "Precision = TP / (TP + FP)",
//     "Recall = TP / (TP + FN)"
//   ],
//   "examTopics": [
//     "Differences between supervised, unsupervised, and reinforcement learning",
//     "When to use classification vs. regression",
//     "How gradient descent minimizes a cost function",
//     "Overfitting vs. underfitting and remedies (regularization, dropout, cross-validation)",
//     "The purpose and formula of the sigmoid function in logistic regression",
//     "K-Fold cross-validation and why it matters",
//     "The role of the learning rate (α) in training convergence",
//     "Precision vs. Recall vs. F1 Score and when to prioritize each"
//   ]
// }

export async function getFirstThreeNotes(userId: string) {
    const session = await getSession(); 

    if (!session || userId !== session.user.id) {
        return {error: "Unauthorized"}
    }

    await connectDB();

    try {
        const firstThreeNotes = await Note.find({userId: userId}).sort({"updatedAt": -1}).limit(3);
    
        return firstThreeNotes; 
    } catch (error) {
        return {error: error}; 
    }

}

export async function getPaginatedNotes(userId: string, page: number = 1, limit: number = 10) {
    const session = await getSession();

    if (!session || userId !== session.user.id) {
        return { error: "Unauthorized" };
    }

    await connectDB();

    try {
        const skip = (page - 1) * limit;
        const [notes, total] = await Promise.all([
            Note.find({ userId }).sort({ updatedAt: -1 }).skip(skip).limit(limit),
            Note.countDocuments({ userId }),
        ]);

        return {
            notes,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
    } catch {
        return { error: "Failed to fetch notes" };
    }
}


export async function getNoteById(noteId: string) {
    const session = await getSession();

    if (!session) {
        return { error: "Unauthorized" };
    }

    await connectDB();

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return { error: "Note not found" };
        }

        if (note.userId.toString() !== session.user.id) {
            return { error: "Unauthorized" };
        }

        return { note };
    } catch {
        return { error: "Failed to fetch note" };
    }
}

export async function createNote(data: {
    userId: string, 
    title: INote["title"], 
    sourceType: INote["sourceType"], 
    rawText: INote["rawText"], 
    summary: INote["summary"],
    fileKey?: INote["fileKey"], 
    sourceUrl?: INote["sourceUrl"], 
}) {

    const session = await getSession(); 
    if (!session?.user || session.user.id != data.userId) {
        return { error: "Unauthorized" };
    }

    await connectDB();

    try {
        const note = await Note.create({
            userId: data.userId,
            title: data.title,
            sourceType: data.sourceType,
            rawText: data.rawText,
            summary: data.summary,
            ...(data.fileKey && { fileKey: data.fileKey }),
            ...(data.sourceUrl && { sourceUrl: data.sourceUrl }),
        });

        revalidatePath("/dashboard");
        return { success: true, noteId: note._id.toString() };
    } catch (err) {
        console.error("Failed to create note:", err);
        return { error: "Failed to create note" };
    }
}

export async function updateNote(
    noteId: string,
    updates: Partial<{
        title: string;
        summary: Partial<INote["summary"]>;
    }>
) {
    const session = await getSession();

    if (!session) {
        return { error: "Unauthorized" };
    }

    await connectDB();

    try {
        const note = await Note.findById(noteId);

        if (!note) return { error: "Note not found" };
        if (note.userId.toString() !== session.user.id) return { error: "Unauthorized" };

        if (updates.title !== undefined) note.title = updates.title;

        if (updates.summary) {
            if (updates.summary.tldr !== undefined) note.summary.tldr = updates.summary.tldr;
            if (updates.summary.keyConcepts !== undefined) note.summary.keyConcepts = updates.summary.keyConcepts;
            if (updates.summary.formulas !== undefined) note.summary.formulas = updates.summary.formulas;
            if (updates.summary.examTopics !== undefined) note.summary.examTopics = updates.summary.examTopics;
        }

        await note.save();
        revalidatePath(`/notes/${noteId}`);
        revalidatePath("/notes");
        revalidatePath("/dashboard");

        return { success: true };
    } catch {
        return { error: "Failed to update note" };
    }
}