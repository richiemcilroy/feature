import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase-client';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userFinderLoaded, setUserFinderLoaded] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userProjects, setUserProjects] = useState(null);
  const [userFeatures, setUserFeatures] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    setUserFinderLoaded(true);

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const getUserDetails = () => supabase.from('users').select('*').single();
  const getUserProjects = () => supabase.from('projects').select('*');
  const getUserFeatures = () => supabase.from('features').select('*');
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    if (user) {
      Promise.allSettled([getUserDetails(), getSubscription(), getUserProjects(), getUserFeatures()]).then(
        (results) => {
          setUserDetails(results[0].value.data);
          setSubscription(results[1].value.data);
          setUserProjects(results[2].value.data);
          setUserFeatures(results[3].value.data);
          setUserLoaded(true);
          setUserFinderLoaded(true);
        }
      );
    }
  }, [user]);

  const value = {
    session,
    user,
    userDetails,
    userProjects,
    userFeatures,
    userLoaded,
    subscription,
    userFinderLoaded,
    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => {
      setUserDetails(null);
      setSubscription(null);
      return supabase.auth.signOut();
    }
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

//Projects
export const newProject = async (user, data) => {
  const { error } = await supabase.from('projects').insert({
    id: user?.id,
    project_name: data?.project_name,
    project_domain: data?.project_domain,
    project_verified: false,
    project_data: []
  });
  if (error) {
    throw error;
  } else {
    return "Success";
  }
};

export const editProject = async (data) => {
  const { error } = await supabase
    .from('projects')
    .update({
      project_name: data?.project_name,
    }).eq('project_id', data?.project_id);

    if (error) {
      throw error;
    } else {
      return "Success";
    }
};

export const deleteProject = async (id) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .match({ project_id: id })

    if (error) {
      throw error;
    } else {
      return "Success";
    }
};

export const projectMetaUpdate = async (projectID, formData) => {
  const { error } = await supabase
    .from('projects')
    .update({
      project_data: formData
    }).eq('project_id', projectID);

    if (error) {
      throw error;
    } else {
      return "Success";
    }
};

export const verifyProject = async (id) => {
  const { data, error } = await supabase
    .from('projects')
    .select('id', 'project_verified')
    .eq('project_id', id);

  if (error) {
    throw error;
    return "Error"
  }

  return data;
};

//Features
export const newFeature = async (user, data) => {
  const { error } = await supabase.from('projects').insert({
    id: user?.id,
    feature_type: data?.feature_type,
    project_id: data?.project_id
  });
  if (error) {
    throw error;
  } else {
    return "Success";
  }
};